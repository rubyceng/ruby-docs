---
Title: Soybean Admin NestJS 学习（3）：实现动态角色菜单
Draft: false
tags:
  - ERP
  - 开源项目
Author: Ruby Ceng
---

# Soybean Admin NestJS 学习（3）：实现动态角色菜单

## 1. 更新相关 schema

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}

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
  menus     RoleMenu[]
}

model UserRole {
  userId     Int
  roleId     Int
  assignedAt DateTime @default(now())
  role       Role     @relation(fields: [roleId], references: [id])
  user       User     @relation(fields: [userId], references: [id])

  @@id([userId, roleId])
}

model Menu {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  path      String
  component String
  icon      String?
  order     Int
  parentId  Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  parent    Menu?    @relation("MenuHierarchy", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  children  Menu[]   @relation("MenuHierarchy")
  roles     RoleMenu[]
}

model RoleMenu {
  roleId     Int
  menuId     Int
  assignedAt DateTime @default(now())
  role       Role     @relation(fields: [roleId], references: [id])
  menu       Menu     @relation(fields: [menuId], references: [id])

  @@id([roleId, menuId])
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

执行迁移命令： `npx prisma migrate dev --name add_menu_and_role_menu_models`

重新生成 prisma-client `npx prisma generate`

## 2. 创建相关菜单模块

执行命令

> npx nest g module menu --no-spec && npx nest g controller menu --no-spec && npx nest g service menu --no-spec

相关 DTO

```typescript
// create-menu.dto.ts
export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  component: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsInt()
  order: number;

  @IsInt()
  @IsOptional()
  parentId?: number;
}

// update-menu.dto.ts
export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
```

补充相关 Service 和 Controller （详情看源码）

## 3. 补充角色模块 （同上）
