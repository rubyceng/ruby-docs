---
Title: MacOS个人配置
Draft: false
tags:
  - 代码之外
Author: Ruby Ceng
---

## 引言

起因是自己的 MacBookAir 是去年国补刚开的时候入手的，那时候也正好是自己刚参加工作，工作的机子也是 Mac，所以目前一年下来对 Mac 基本熟悉了。于是想着整理一下机子，把机子还原了。记录一下自己把机子从零到一进行配置。也对一些软件和常用包进行分享。

激活完机子第一件事就是先把 HomeBrew 给装上，后续的大部分软件都通过 Brew 进行统一管理，也推荐大家都怎么做。

> **Homebrew** 是一款 macOS (或 Linux) 上的软件包管理器，它简化了软件的安装过程。你可以通过简单的命令来安装、更新和卸载各种软件。

### HomeBrew 安装

```bash
# 安装 官方脚本
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 配置激活Brew路径
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# 验证
brew --version

# Formulae指的是各类第三方包，例：pnpm，uv等，Cask表示macOS 图形界面应用程序，例：chrome

# 更新删除旧包
brew update && brew upgrade && brew cleanup

# 常用命令
brew install <软件包名>
brew search <关键词>
brew list

# 添加相关中文社区包
brew tap Brewforge/homebrew-chinese
```

## Software

接下来就是安装一些常用软件了，软件的安装秉持如下三个原则：

> 1. 安装优先级 ： AppStore > HomeBrew > 成熟商业软件 > 开源项目 > 除此之外不下载。
> 2. 有 web 端的软件不下载桌面端。（如 Telegram，Discord 等）。
> 3. 支持正版，对于不明来路或破解的软件坚决不下载。当然相对应的也会提供免费的开源替代品。

### 1. 工具

**[Surge](https://nssurge.com/)**
_作用_：代理 | _渠道_：官网 | _价格_：拼车均价 ¥140 左右，官网$50 不太推荐。

> 程序员建议上个 Surge，内穿抓包都相当方便。
> **替代**：
> [clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev.git) | _渠道_：GitHub | 价格\*：免费。
> 作者一直在积极维护，Win 我也是用的这个。

**[Warp](https://www.warp.dev/)**
_作用_：终端 | _渠道_：HomeBrew | _价格_：免费

> 界面好看，支持 AI 补全，缺点是联网登陆，不建议公司内使用。
> **替代**：
> **[Ghosty](https://ghostty.org/)** | _渠道_：HomeBrew | _价格_：免费。
> 公司我用的是这个，相比 Iterm 2 更加轻量，用 Rust 写的。

**[Cork](https://corkmac.app/)**
_作用_：HomeBrew GUI | _渠道_：Github | _价格_：免费/25 欧

> 界面简洁好看，自己打包是免费的有一定门槛可以看看 README，也可以购买支持作者。

**[OrbStack](https://orbstack.dev/)**
_作用_：容器管理 | _渠道_：HomeBrew | _价格_：免费

> 轻量化的容器管理，也可以创建虚拟机。

**[Mos](https://mos.caldis.me/)**
_作用_：鼠标工具 | _渠道_：HomeBrew | _价格_：免费

> 解决 Mac 鼠标连接和触控板反向的问题，还可以让鼠标滚动变得号丝话啊。

**[Coteditor](https://coteditor.com/)**
_作用_：文本编辑 | _渠道_：AppStore | _价格_：免费

> 轻量文本编辑器。

**[The-unarchiver](https://theunarchiver.com/)**
_作用_：多格式解压缩 | _渠道_：AppStore | _价格_：免费

> 基本支持所有压缩格式，轻量。

**[Parallel-Desktop](https://www.parallels.com/)**
_作用_：虚拟机 | _渠道_：AppStore | _价格_：¥349/年

> Mac 最著名的虚拟机软件，我是买电脑送了两年。
> **替代**：
> **[VMware Fusion](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion)** | _渠道_：HomeBrew | _价格_：免费。
> 之前看别人分享是有免费版的，PD 到期后再转移到这上面。

**[RustDesk](https://rustdesk.com/zh-cn/)**
_作用_：远程控制 | _渠道_：HomeBrew | _价格_：免费

> 自托管远程控制工具，我的 3m 的小水管，只能勉强跑 30 帧

**[PixPin](https://pixpin.cn/)**
_作用_：截图软件 | _渠道_：HomeBrew | _价格_：免费

> 国产的截图软件，支持长截图，阴影，圆角等。
> **替代**：
> **[Snipaste](https://www.snipaste.com/)** | _渠道_：HomeBrew | _价格_：免费。
> 开源轻量好用的截图软件，功能少一点，但是相当纯粹干净。

**[Easydict](https://github.com/tisfeng/Easydict)**
_作用_：翻译软件 | _渠道_：HomeBrew | _价格_：免费

> 我知道有人说 Bob，这个软件和 Bob 操作逻辑基本一致，缺少 ocr 功能，但是开源免费。
> **替代：** > [Bob](https://bobtranslate.com/) | _渠道_：AppStore | _价格_：几十块忘了。
> 简洁好用，支持 OCR。

**[Ice](https://icemenubar.app/)**
_作用_：菜单栏工具 | _渠道_：HomeBrew | _价格_：免费

> MacBook 的刘海屏导致必须要用一个管理工具来看，这个软件功能齐全而且相当简洁，缺点是需要录屏权限来实现自定义的悬浮 Bar，介意勿入。

**[NotchNook](https://lo.cafe/notchnook)**
_作用_：灵动岛 | _渠道_：HomeBrew | _价格_：¥100

> MacBook 自己的灵动岛，之前的版本可以支持管理在线播放，放小组件等，这个只能等开发者适配了。纯美化软件。

### 2. 开发

**[Cursor](https://www.cursor.com/)**
_作用_：AI IDE | _渠道_：HomeBrew | _价格_：$20

> 习惯了之后开发非常丝滑，目前的主要开发 IDE。但是现在请求上下文越来越短了。主要补全是我用过最好用的。

**Xcode**
_作用_：IOS IDE | _渠道_：Appstore | _价格_：免费

> IOS 打包必备的 IDE。

**[Dbeaver-community](https://dbeaver.io/download/)**
_作用_：数据库客户端 | _渠道_：HomeBrew | _价格_：免费

> 开源免费，更新频率也快。

**[Fork](https://git-fork.com/)**
_作用_：Git GUI | _渠道_：HomeBrew | _价格_：免费

> 非强制收费，会有支持弹窗。界面接近原生，简洁好看，最好用的 Git GUI。

**[ApiFox](https://apifox.com/)**
_作用_：接口测试 | _渠道_：HomeBrew | _价格_：免费

> 国产测试软件，相比 Postman 优点是 ui 和操作比较美观便捷，缺点是比较重型。

**[Mos](https://mos.caldis.me/)**
_作用_：鼠标工具 | _渠道_：HomeBrew | _价格_：免费

> 解决 Mac 鼠标连接和触控板反向的问题，还可以让鼠标滚动变得号丝话啊。

### 3. 社媒

**微信**
_作用_：国内社交 | _渠道_：AppStore | _价格_：免费

> 小而美。

**网易云音乐**
_作用_：听歌软件 | _渠道_：AppStore | _价格_：免费

> 离不开日推，88 vip 赠送了年费，四舍五入不要钱。

**剪映**
_作用_：剪辑软件 | _渠道_：AppStore | _价格_：免费

> 简单易上手，剪 Vlog 用。

**Obsidian**
_作用_：笔记软件 | _渠道_：HomeBrew | _价格_：免费 / 增值服务

> 插件生态强大，我是用 git 插件来实现多设备同步的。

**WPS Office**
_作用_：办公软件 | _渠道_：AppStore | _价格_：免费/增值服务

> Mac 上 WPS 的响应速度感觉比 Office 快很多，缺点是应用内有推销横幅。

**Google-Chrome**
_作用_：浏览器 | _渠道_：HomeBrew | _价格_：免费

> 多设备同步以及上手习惯还是 Chrome 好用，很看好 Gemini 对各个软件的整合。

**夸克云盘**
_作用_：网盘 | _渠道_：HomeBrew | _价格_：免费/增值服务

> 一年鱼上就 100，便宜大碗，虽然我有 Google One，但是数据全在国外比较没安全感。

## System

### 配置 zsh

安装配置 Oh My Zsh 和 Powerlevel10k (p10k) 是美化和增强 Mac 终端。

> **Oh My Zsh**：一个强大的 Zsh 配置管理框架

```bash
# 官方安装脚本
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

> **[Powerlevel10k](https://github.com/romkatv/powerlevel10k)**：一个功能极其丰富且速度飞快的 Zsh 主题

```bash
# 安装 Powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 安装相关字体查看git仓库的文档

# 安装相关的插件
# zsh-autosuggestions: 命令提示插件，当你输入命令时，会自动推测你可能需要输入的命令，按下右键可以快速采用建议。
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting: 命令语法校验插件，在输入命令的过程中，若指令不合法，则指令显示为红色，若指令合法就会显示为绿色。
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 启用插件
# ～/.zshrc
# z快速跳转历史文件夹 #extract x命令快速解压缩 web-search Google快速搜索
plugins=(git zsh-autosuggestions zsh-syntax-highlighting z extract web-search)
```

最后文件内容如下：

```bash
# ～/.zshrc

## 终端提示符，必须在最上层

if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then

source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"

fi




## oh-my-zsh

export ZSH="$HOME/.oh-my-zsh"



ZSH_THEME="powerlevel10k/powerlevel10k"



# zsh-autosuggestions: 命令提示插件，当你输入命令时，会自动推测你可能需要输入的命令，按下右键可以快速采用建议。

# zsh-syntax-highlighting: 命令语法校验插件，在输入命令的过程中，若指令不合法，则指令显示为红色，若指令合法就会显示为绿色。

# z快速跳转历史文件夹 #extract x命令快速解压缩 web-search Google快速搜索

plugins=(git zsh-autosuggestions zsh-syntax-highlighting z extract web-search)



source $ZSH/oh-my-zsh.sh



[[ -f /Users/rubyceng/.dart-cli-completion/zsh-config.zsh ]] && . /Users/rubyceng/.dart-cli-completion/zsh-config.zsh || true



[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh # To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.




## nvm

export NVM_DIR="$HOME/.nvm"

[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"

[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"

```

## Develop

> 相关开发环境以 HomeBrew 统一管理，全部按需安装。如果自己使用 HomeBrew 安装的部分可以略过对应部分的内容。

### 1. Python 相关环境

使用 brew 安装与管理 python 环境

```bash
# 删除 /Applications 下的 Python 相关文件

# 删除 Python 框架
cd /Library/Frameworks
rm -rf ./Python.framework

# 删除符号连接
ls -l /usr/local/bin | grep '/Library/Frameworks/Python.framework'
cd /usr/local/bin
ls -l | grep '/Library/Frameworks/Python.framework' | awk '{print $9}' | xargs sudo rm

# 检查 .zshrc 下是否有python相关环境变量

# 使用 brew 安装 python
brew install python3
```

安装 pipx 和 uv

> **`pipx`**: 一个用来**安装和运行 Python 终端应用**的工具。你可以把它想象成一个专门为命令行工具（如 `uv`、`poetry`、`black` 等）准备的 `pip`。
> **`uv`**: 一个**速度极快的 Python 包管理器**。

```bash
brew install pipx

pipx --version

brew install uv
```

### 2. Node 相关环境

处理官网上下载的 nvm 和 node 版本。

```bash
# 删除nvm
rm -rf ~/.nvm/

# 删除相关环境变量
vi ~/.zshrc

# 检查是否清理干净
command -v nvm

# 删除node相关
# 小心操作，一次一行
sudo rm /usr/local/bin/node
sudo rm /usr/local/bin/npm
sudo rm /usr/local/bin/npx
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/include/node
sudo rm -rf /opt/local/bin/node
sudo rm -rf /opt/local/include/node
sudo rm -rf /opt/local/lib/node_modules

# 删除收据文件
sudo rm -rf /usr/local/share/doc/node
sudo rm -rf /usr/local/share/man/man1/node.1
sudo rm -rf /usr/local/lib/dtrace/node.d
# 清理 .pkg 安装收据
sudo rm -rf /private/var/db/receipts/org.nodejs.*
```

安装 nvm 和 node 相关

```bash
# 开始从0创建nvm
brew install nvm

# 根据brew指示配置nvm
mkdir ~/.nvm

# 把以下内容加入 ～/.zshrc
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"

# 重新加载zsh
source ~/.zshrc

# 安装node
nvm install --lts

# 检查安装情况
node -v
npm -v
which node  # 输出的路径现在应该包含 .nvm
```

使用 brew 安装 pnpm 相关

```bash
# 先检查旧pnpm的情况
which pnpm

# 如果找不到pnpm则说明上一步已经清空了
npm uninstall -g pnpm

# 进入 ~/.zshrc 里面检查pnpm相关路径，如我的是 /Users/ruby/Library/pnpm
# 清除旧的环境变量配置
vi ~/.zshrc
rm -rf /Users/ruby/Library/pnpm

# 使用brew安装
brew install pnpm

which pnpm
pnpm -v
```

### 3. Flutter 相关环境配置

```bash
# 安装fvm 使用fvm统一管理flutter sdk版本

brew tap leoafarias/fvm

brew install fvm

fvm --version

fvm install stable

fvm list

# 以下是开发的工作流

# 创建一个项目文件夹并进入
mkdir my_flutter_app
cd my_flutter_app
fvm use stable

fvm flutter create .

# 安装其他的依赖
fvm flutter doctor

# 进入xcode安装Xcode Command Line Tools
sudo xcode-select --install

# 安装ios的sdk cocoapods
brew install cocoapods

# 安装Android Studio
brew install --cask android-studio

# 进入Android Studio安装Android SDK

# 同意Android证书
fvm flutter doctor --android-licenses

# 检查
fvm flutter doctor
```

### 4. Java 相关环境

```bash

# 例如，安装 OpenJDK 17
brew install openjdk@17

# 设置环境变量
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"

# 验证
source ~/.zshrc
java -version

# 安装Maven
brew install maven
mvn -v
```

## CLI

### 1. Gemini-Cli

```bash
# GitHub仓库地址：https://github.com/google-gemini/gemini-cli

npm install -g @google/gemini-cli
gemini

# 配置./.zshrc
# gemini cli
export GEMINI_API_KEY="-"

```

### 2. ClaudeCode

```bash

# 安装CLI
npm install -g @anthropic-ai/claude-code
claude --version

# 使用anyrouter进行配置
# https://anyrouter.top/console/token

```
