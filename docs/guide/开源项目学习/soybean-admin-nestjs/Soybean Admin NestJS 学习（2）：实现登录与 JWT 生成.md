---
Title: Soybean Admin NestJS 学习（2）：实现登录与 JWT 生成
Draft: false
tags:
  - ERP
  - 开源项目
Author: Ruby Ceng
---

# Soybean Admin NestJS 学习（2）：实现登录与 JWT 生成

## 1. 安装依赖

### 1.1 安装 Passport 和 JWT 相关依赖

Passport 是 Node.js 中最流行的认证中间件。我们将使用它和它的 JWT 策略 (passport-jwt) 来处理认证流程。

- `@nestjs/passport`: NestJS 与 Passport 的集成模块
- `@nestjs/jwt`: 用于处理 JWT 的创建和验证
- `passport`: Passport 核心库
- `passport-jwt`: Passport 的 JWT 策略
- `@types/passport-jwt`: passport-jwt 的 TypeScript 类型定义

执行安装命令：

```bash
pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt && pnpm add -D @types/passport-jwt
```

## 2. Auth 模块

### 2.1 创建 Auth 模块

执行命令：

```bash
npx @nestjs/cli g module auth && npx @nestjs/cli g service auth && npx @nestjs/cli g controller auth
```

### 2.2 模块配置

现在，我们需要配置 AuthModule，让它能够使用 UserModule（为了查询用户）和 JwtModule（为了生成 Token）。

为了安全，JWT 的密钥和过期时间不应该硬编码在代码里。我们将它们添加到 `.env` 文件中，然后通过 `@nestjs/config` 来读取。这是 soybean-admin-nestjs 项目中的标准实践。

#### 2.2.1 安装 @nestjs/config

```bash
# 添加依赖
pnpm add @nestjs/config

# 追加 JWT 相关 secret
echo "\n# JWT Settings\nJWT_SECRET=your-super-secret-key-change-it\nJWT_EXPIRES_IN=7d" >> .env
```

#### 2.2.2 重写 AppModule

```typescript
// app.module.ts
JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
    },
  }),
}),
```

### 2.3 实现登录功能

修改 `auth.service.ts`：

```typescript
// auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Note: In a real app, you should have a more robust user lookup.
    // This is a simplified example.
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

更新 `user.service.ts`：

```typescript
// user.service.ts
async findOneByUsername(username: string) {
 return this.prisma.user.findUnique({ where: { username } });
}
```

创建 `auth.controller.ts`：

```typescript
// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }
}
```

创建 `login.dto.ts`：

```typescript
// login.dto.ts
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### 2.4 测试登录功能

```bash
# 登录测试
curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}' http://localhost:3000/auth/login

# 错误测试
curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "wrongpassword"}' http://localhost:3000/auth/login
```

### 2.5 环境变量配置

```env
# .env

# 数据库连接字符串 (PostgreSQL)
# 格式: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://root:lfFxGjULezLVgO2DTQAm@10.0.5.134:8432/my-soybean-backend?schema=public"
DIRECT_DATABASE_URL="postgresql://root:lfFxGjULezLVgO2DTQAm@10.0.5.134:8432/my-soybean-backend?schema=public"

# JWT 配置
JWT_SECRET="your-super-secret-key-for-development"
JWT_EXPIRES_IN="604800"
```

## 3. 实现认证

### 3.1 创建 JWT 策略 (JwtStrategy)

JwtStrategy 的核心任务是：

1. 从请求的 Authorization 头中提取 Bearer Token
2. 使用我们 `.env` 文件里的 `JWT_SECRET` 密钥来验证这个 Token 的签名是否有效
3. 检查 Token 是否已过期
4. 如果 Token 有效，就解析出里面的用户信息（payload），并将其附加到请求对象（`req.user`）上，以便后续的业务逻辑使用

创建 `jwt.strategy.ts`：

```typescript
// jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    // The payload is the decoded JWT from the token.
    // We can trust this payload because passport-jwt has already verified the token's signature and expiration.
    // The return value of this method will be attached to the Request object as `req.user`.
    return { userId: payload.sub, username: payload.username };
  }
}
```

更新 `auth.module.ts`：

```typescript
// auth.module.ts
providers: [AuthService, JwtStrategy],
```

### 3.2 创建守卫

创建 `jwt-auth-guard.ts`：

```typescript
// jwt-auth-guard.ts
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
```

使用 Guard：

```typescript
// user.controller.ts
@UseGuards(JwtAuthGuard)
@Get()
findAll() {
  return this.userService.findAll();
}
```

### 3.3 测试认证

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}' http://localhost:3000/auth/login
curl -H "Authorization: Bearer 替换成access_token" http://localhost:3000/user
```

## 4. 权限控制

### 4.1 集成 Casbin 实现基于角色的访问控制 (RBAC)

到目前为止，我们只解决了"你是谁"的问题（认证）。任何一个成功登录的用户，都可以访问 `GET /user` 接口。但一个真正的系统需要更精细的控制："你能做什么？"（授权）。例如：

- 管理员 (admin) 应该能访问所有接口
- 普通用户 (user) 可能只能查看自己的信息，不能查看用户列表
- 游客 (guest) 在登录前，除了登录接口外，什么都不能访问

#### 4.1.1 Casbin 的核心思想

Casbin 将权限逻辑从代码中抽离出来，用一套简单的访问控制模型来管理。最经典的 PERM 模型是：

```
p, sub, obj, act
```

- `p`: policy，表示这是一条策略规则
- `sub`: subject，主体，即"谁"，通常是用户 ID 或角色 ID
- `obj`: object，对象，即"想要访问什么资源"，通常是 API 路径（如 `/user`）
- `act`: action，动作，即"想做什么操作"，通常是 HTTP 方法（如 `GET`, `POST`）

例如，一条策略可以是：

```
p, admin, /user, GET
```

它的意思是：角色为 `admin` 的主体，允许对 `/user` 这个资源执行 `GET` 操作。

我们将把这些策略规则存入数据库中。这样，当一个请求进来时，我们只需要查询数据库，用 Casbin 引擎判断一下当前用户是否匹配某条策略即可。

#### 4.1.2 更新数据库 Schema

添加 Role（角色）、UserRole（用户与角色的关联）以及 CasbinRule（存储 Casbin 策略）模型。

```prisma
// schema.prisma
model User {
  id        Int        @id @default(autoincrement())
  username  String     @unique
  password  String
  nickname  String?
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  roles     UserRole[]
}

model Role {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  label     String     @unique
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  users     UserRole[]
}

model UserRole {
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  role      Role     @relation(fields: [roleId], references: [id])
  roleId    Int
  assignedAt DateTime @default(now())

  @@id([userId, roleId])
}

model CasbinRule {
  id    Int     @id @default(autoincrement())
  ptype String
  v0    String?
  v1    String?
  v2    String?
  v3    String?
  v4    String?
  v5    String?

  @@unique([ptype, v0, v1, v2, v3, v4, v5])
}
```

执行数据库迁移：

```bash
pnpm prisma migrate dev --name add_rbac_models
```

#### 4.1.3 安装 Casbin 依赖

```bash
pnpm add casbin casbin-prisma-adapter
```

#### 4.1.4 定义 Casbin 的访问控制模型 (Access Control Model)

创建 `casbin-model.conf`：

```conf
# Casbin RBAC model configuration

[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

#### 4.1.5 创建 Casbin 模块和服务

```bash
pnpm exec nest g module casbin && pnpm exec nest g service casbin
```

修改 `casbin.service.ts`：

```typescript
// casbin.service.ts
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Enforcer, newEnforcer } from "casbin";
import { PrismaAdapter } from "casbin-prisma-adapter";
import { join } from "path";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CasbinService implements OnModuleInit {
  private enforcer: Enforcer;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const modelPath = join(process.cwd(), "casbin-model.conf");
    const adapter = await PrismaAdapter.newAdapter(this.prisma);
    this.enforcer = await newEnforcer(modelPath, adapter);

    // Load policies from the database
    await this.enforcer.loadPolicy();
  }

  /**
   * Checks if a user (subject) has permission to perform an action on an object.
   * @param sub The subject (user role)
   * @param obj The object (API path)
   * @param act The action (HTTP method)
   * @returns `true` if the user has permission, `false` otherwise.
   */
  async enforce(sub: string, obj: string, act: string): Promise<boolean> {
    return this.enforcer.enforce(sub, obj, act);
  }

  // Optional: Add methods to add/remove policies if you need to manage them dynamically
  async addPolicy(...params: string[]) {
    return this.enforcer.addPolicy(...params);
  }

  async removePolicy(...params: string[]) {
    return this.enforcer.removePolicy(...params);
  }
}
```

#### 4.1.6 创建权限控制守卫

这个守卫的职责是：

1. 在每个受保护的请求到达时，从 `req.user` 中获取当前用户的角色（我们稍后会实现这部分）
2. 获取当前请求的 API 路径（`req.path`）和 HTTP 方法（`req.method`）
3. 调用 `CasbinService.enforce()` 方法，将用户的角色、请求路径和方法传递过去，判断用户是否有权限
4. 如果有权限，则放行；否则，抛出 `ForbiddenException` (403 Forbidden) 异常

创建 `permission.guard.ts`：

```typescript
// permission.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CasbinService } from "src/casbin/casbin.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly casbinService: CasbinService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      // This should technically be handled by JwtAuthGuard, but as a safeguard:
      return false;
    }

    // Get user roles. In a real app, you might have multiple roles.
    // We'll start with a simple implementation.
    const userWithRoles = await this.userService.findOne(user.userId);
    if (
      !userWithRoles ||
      !userWithRoles.roles ||
      userWithRoles.roles.length === 0
    ) {
      throw new ForbiddenException("You have no roles assigned.");
    }

    const path = request.path;
    const method = request.method.toUpperCase();

    // Check permission for each role the user has.
    for (const userRole of userWithRoles.roles) {
      const hasPermission = await this.casbinService.enforce(
        userRole.role.name,
        path,
        method
      );
      if (hasPermission) {
        return true; // If any role has permission, allow access.
      }
    }

    throw new ForbiddenException(
      "You do not have permission to access this resource."
    );
  }
}
```

#### 4.1.7 更新相关代码

更新 `auth.module.ts`：

```typescript
// auth.module.ts
@Module({
  imports: [
    UserModule,
    PassportModule,
    CasbinModule, // Import CasbinModule
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: parseInt(
            configService.get<string>("JWT_EXPIRES_IN") ?? "0",
            10
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PermissionGuard], // Add PermissionGuard
  exports: [PermissionGuard], // Export for global use if needed
})
export class AuthModule {}
```

更新 `UserService`：

```typescript
// user.service.ts
const user = await this.prisma.user.findUnique({
  where: { id },
  include: {
    roles: {
      include: {
        role: true,
      },
    },
  },
});
```

更新 `UserController`：

```typescript
// user.controller.ts
// 将 PermissionGuard 添加到 UserController 的 findAll 方法上。
// 因为 JwtAuthGuard 必须先运行以确保用户已登录并解析出 req.user，所以守卫的顺序非常重要。
@UseGuards(JwtAuthGuard, PermissionGuard)
```

### 4.2 初始化数据

#### 4.2.1 编写 seed 初始化策略

1. 创建 `my-soybean-backend/prisma/seed.ts` 文件，并填入初始化用户、角色和 Casbin 策略的完整逻辑
2. 修改 `my-soybean-backend/package.json`，添加 `prisma.seed` 配置

创建 `seed.ts`：

```typescript
// seed.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

// initialize Prisma Client
const prisma = new PrismaClient();

// password hashing function
const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

async function main() {
  // create a role: 'admin'
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      label: "Administrator",
    },
  });
  console.log(`Created role: ${adminRole.name}`);

  // create a user: 'admin'
  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: await hashPassword("password"), // Default password is 'password'
      nickname: "Super Admin",
    },
  });
  console.log(`Created user: ${adminUser.username}`);

  // assign 'admin' role to 'admin' user
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });
  console.log(`Assigned role ${adminRole.name} to user ${adminUser.username}`);

  // create casbin policy for admin to access all user resources
  // p, <role>, <path>, <method>
  // This policy allows the 'admin' role to perform 'GET' on '/users'
  const policy = {
    ptype: "p",
    v0: adminRole.name,
    v1: "/users",
    v2: "GET",
  };
  await prisma.casbinRule.upsert({
    where: {
      ptype_v0_v1_v2_v3_v4_v5: {
        ptype: policy.ptype,
        v0: policy.v0,
        v1: policy.v1,
        v2: policy.v2,
        v3: null,
        v4: null,
        v5: null,
      },
    },
    update: {},
    create: policy,
  });
  console.log(
    `Created casbin policy: ${policy.v0} can ${policy.v2} ${policy.v1}`
  );
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
```

更新 `package.json`：

```json
// package.json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

执行初始化：

```bash
npx prisma db seed
```

#### 4.2.2 验证权限控制

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "password"}' http://localhost:3000/auth/login

curl -X GET http://localhost:3000/user -H "Authorization: Bearer 你的Access Token"
```
