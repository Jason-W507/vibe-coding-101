# 终端、命令与运行环境

AI 经常给出一行命令，让你“在终端里运行”。要理解这句话，可以先区分窗口、解释命令的程序，以及命令最终调用的工具。

## 终端和 Shell 分别做什么

今天桌面上的终端通常是一个应用，提供文字输入输出的界面。**Shell** 是接收并解释命令的程序，常见的有 Windows 上的 **PowerShell** 与传统命令提示符 **cmd**，以及 macOS（默认 **Zsh**）和 Linux（常见 **Bash**）上的 Shell。同一个终端应用可以打开不同的 Shell。

学会看提示符能帮你立刻分辨当前处于哪种环境：`PS C:\work>` 开头通常是 PowerShell，`C:\work>` 是 `cmd`，而结尾是 `$` 或 `%`（如 `lin@mac ~ %`）通常是 Bash 或 Zsh。**这是与 AI 协作时极易踩坑的地方**：AI 生成的命令往往默认采用 Linux/macOS 的 Bash 语法（例如用 `export KEY=1` 设置环境变量、用 `rm -rf` 删除目录、用 `&&` 连接两条命令），如果直接复制到 Windows 自带的 Windows PowerShell 5.1 或 `cmd` 中运行就会报错。

| 常见操作 | PowerShell（Windows） | Bash / Zsh（macOS / Linux） | cmd（Windows 传统） |
| --- | --- | --- | --- |
| 查看当前目录 | `Get-Location`（或 `pwd`） | `pwd` | `cd` |
| 列出目录内容 | `Get-ChildItem`（或 `ls`） | `ls -la` | `dir` |
| 切换目录 | `Set-Location 路径`（或 `cd 路径`） | `cd 路径` | `cd /d 路径` |
| 临时设置环境变量 | `$env:PORT="8000"` | `export PORT=8000` | `set PORT=8000` |
| 查找命令指向哪个程序 | `Get-Command python` 或 `where.exe python` | `which python3` | `where python` |

你在编辑器里打开的集成终端，也会运行某个 Shell。窗口嵌在编辑器里，不代表所有命令都由编辑器自己执行。

一条命令可能调用 Shell 自带的功能，也可能启动另一个程序。它与 CPU 最终执行的机器指令处于不同层次：你输入的是面向工具的请求，工具运行后还要经过相应执行过程。

## 从两条只读命令开始理解

下面是 PowerShell 的例子，用来查看当前所在位置和该位置下的内容。它们不修改文件。

```powershell
Get-Location
Get-ChildItem
```

第一条返回当前位置，第二条列出其中的项目。命令名不是必须记忆的知识清单；这里是用它们说明终端能够查看程序接下来操作的环境。不同 Shell 的语法和命令体系可能不同，复制步骤时需要知道原文面向哪一种环境。[PowerShell 的当前位置文档](https://learn.microsoft.com/en-us/powershell/scripting/samples/managing-current-location)介绍了相应规则。

## 工作目录怎样影响命令

假设有这样的结构：

```text
reading-notes/
├── app/
└── data/
    └── notes.txt
```

如果 PowerShell 当前位于 `reading-notes`，`Get-ChildItem .\data` 会列出其下 `data` 的内容。如果当前位于 `reading-notes\app`，这个相对位置就变了。程序报“找不到文件”，有时只需要解释清楚它究竟从哪里出发。

`Set-Location`（别名 `cd`）用来改变当前位置。路径中有空格时，必须用引号把它括成一个整体，例如 `cd "C:\work\reading notes"`；在终端里输入文件或目录名的前几个字母后按 `Tab` 键，Shell 会自动补全真实存在的名字并替带空格的路径加上引号。具体路径示例必须与你的目录对应，书中的示意名字不会自动在电脑上存在。

“项目根目录”通常指这份项目选定的顶层目录。它不一定是磁盘根目录，也不等于终端每次打开时默认进入的位置。

## 程序怎样找到其他工具

执行一个命令名时，Shell 会按自己的规则判断它对应别名、函数、内置命令还是外部程序。对于需要搜索的外部程序，环境变量 `PATH` 中记录的目录通常参与查找。

环境变量可以理解为运行环境中按名字提供的信息。程序可能读取某个变量来确定工具位置、配置模式或服务地址。变量名、读取方法和生效范围都属于具体环境的约定。

PowerShell 中可以用下面的表达式查看当前环境中的 PATH：

```powershell
$env:PATH
```

它是一组供查找使用的目录列表（Windows 用分号 `;` 分隔，macOS/Linux 用冒号 `:` 分隔），不是项目全部文件的列表。当你在终端看到以下三类报错时，几乎都是因为工具还没安装，或者它的安装目录不在当前 `PATH` 中：
- PowerShell：`无法将“xxx”项识别为 cmdlet、函数、脚本文件或可运行程序的名称`
- cmd：`'xxx' 不是内部或外部命令，也不是可运行的程序`
- Bash / Zsh：`command not found: xxx`

需要注意三点实用细节：第一，**安装新软件或修改系统 `PATH` 后，必须关闭并重新打开终端（在 VS Code 等编辑器里通常需要重启整个编辑器）**，因为已运行的进程不会自动获取新的环境变量；第二，在 PowerShell 或 Bash 中运行当前目录下的脚本或程序，出于安全规则必须显式写成 `.\app.exe` 或 `./script.sh`，不能只写文件名；第三，Windows PowerShell 首次运行 `npm` 或激活 Python 虚拟环境脚本（`.ps1`）时，若提示“因为在此系统上禁止运行脚本”，属于 PowerShell 执行策略（ExecutionPolicy）限制，需要按提示调整当前用户的执行策略或改用 `cmd` / Git Bash。PowerShell 对命令查找的详细规则见[命令优先级文档](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_command_precedence)。

## 一条命令里都有什么

可以把常见命令读成“调用哪个工具，传入哪些参数”。参数可能表示输入文件、输出位置、选项或其他设置。空格、引号和符号由 Shell 与工具共同解释，同一个字符在不同环境里不一定有相同含义。

教程或报错截图中出现的 `PS C:\work>`、`$` 等内容，可能是命令提示符的一部分。它用来显示当前环境，不一定是需要输入的命令正文。判断时应看代码块的说明，而不是把整行外观原样复制。

程序还有输入和输出通道。普通结果（标准输出 `stdout`）与错误信息（标准错误 `stderr`）可以走不同通道，程序结束时还会返回一个整数**退出码（exit code）**：按惯例 `0` 表示成功，非 `0` 表示出错（PowerShell 中可用 `$LASTEXITCODE` 查看）。另外在终端里，按下 `Ctrl + C` 的作用是**向当前正在前台运行的程序发送中断信号（停止运行）**，而不是复制文本；在 Windows 终端里复制粘贴通常用 `Ctrl + Shift + C` / `V` 或鼠标右键。

## 怎样读懂“运行环境不对”

如果同一个项目在两台电脑上表现不同，差别可能来自工作目录、工具版本、依赖、环境变量、权限或操作系统等条件。排查的第一步，是把这些条件说清楚。

向 AI 描述问题时，“我在 PowerShell 中，从这个项目目录运行了这条命令，得到这段完整输出”，比“代码又不能运行了”提供了更多有效信息。遇到要求修改系统设置的建议，也应该先理解它打算改变哪一项运行条件，以及该条件怎样解释当前现象。

本篇示例采用 PowerShell，是为了提供一套明确的文字示例。终端、Shell、工作目录、参数和环境变量之间的关系，也能帮助你理解其他操作环境。

<!-- navigation -->

---

[上一篇：内存里的数据去了哪里](05-memory.md) · [完整目录](../../README.md) · [按问题查阅](../questions.md) · [下一篇：编程语言与程序的运行](07-languages-runtime.md)
