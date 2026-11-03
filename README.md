# Vibe Coding 101

**面向非计算机专业人士的计算机、软件开发与 AI 编程知识教程。**

如果你已经试过让 AI 写代码，却常被文件、终端、运行环境、报错和前后端之间的关系困住，这份教程希望帮助你逐步看清它们。内容从计算机怎样处理信息讲起，连接到程序、网络与 Web、软件开发维护，最后讨论 AI 如何参与这些工作。

第一版包含一篇导览和六部分、三十五篇专题。以连贯的解释为主，配有关系图、流程图和小示例；没有固定学习时长，也没有必须完成的项目或作业。示例中的读书记录场景用于连接概念，可以直接阅读，不要求做成一套应用。

**开始阅读：[一张图看懂计算机、程序与软件开发](docs/chapters/00-overview.md)**

也可以按需使用四份配套工具页：[常见问题索引](docs/questions.md) · [常见术语速查表](docs/glossary.md) · [实战防坑自检清单](docs/checklist.md) · [随书示例](examples/README.md) · [参考资料](docs/sources.md)。

## 三条精选快速路线（赶时间可按场景选读）

不想一下子读完 36 篇？可以先根据你手头正在卡住的场景，用 40～60 分钟读完一条短路线：

- **路线 A｜救急排错：AI 给了我代码，但跑不起来 / 报错看不懂**
  [00 导览](docs/chapters/00-overview.md) → [03 文件与路径](docs/chapters/03-files-paths.md) → [06 终端与 PATH](docs/chapters/06-terminal.md) → [07 语言与运行时](docs/chapters/07-languages-runtime.md) → [12 读懂报错回溯](docs/chapters/12-errors.md) → [25 看懂项目目录](docs/chapters/25-project-layout.md) → [26 依赖与虚拟环境](docs/chapters/26-dependencies.md) → [28 调试与定位](docs/chapters/28-debugging.md)
- **路线 B｜Web 全景：我想做个网页应用，搞懂前后端、API 与数据库**
  [00 导览](docs/chapters/00-overview.md) → [16 IP、端口与 localhost](docs/chapters/16-network.md) → [17 HTTP、F12 与 CORS](docs/chapters/17-http.md) → [18 浏览器与前端](docs/chapters/18-frontend.md) → [19 后端与 API](docs/chapters/19-backend-api.md) → [20 数据库与 SQL](docs/chapters/20-database.md) → [22 登录与权限](docs/chapters/22-identity.md) → [23 把一次操作串起来](docs/chapters/23-web-journey.md)
- **路线 C｜协作与防坑：怎样和 AI 稳健配合、不改崩代码、不泄露密钥**
  [24 从需求到设计](docs/chapters/24-requirements-design.md) → [25 项目目录职责](docs/chapters/25-project-layout.md) → [27 Git 存档与回退](docs/chapters/27-git.md) → [29 测试在检查什么](docs/chapters/29-testing.md) → [30 构建、部署与密钥边界](docs/chapters/30-build-deploy.md) → [32 AI 编程与 Vibe Coding](docs/chapters/32-ai-coding.md) → [33 模型、上下文与 AGENTS.md](docs/chapters/33-models-context.md) → [34 与 AI 协作五步法](docs/chapters/34-ai-collaboration.md) → [35 AI 的局限与安全边界](docs/chapters/35-ai-limits.md)

## 完整目录

默认路线是导览 → 计算机基础 → 程序设计 → 数据结构与算法 → 网络与 Web → 开发与维护 → AI 编程。每篇底部都有相邻篇目与目录链接。

### 导览

- [00. 一张图看懂计算机、程序与软件开发](docs/chapters/00-overview.md)

### 计算机怎样运行软件

- [01. CPU、内存、磁盘与操作系统](docs/chapters/01-computer.md)
- [02. 数字、文字、图片怎样成为数据](docs/chapters/02-data-encoding.md)
- [03. 文件、目录、路径与权限](docs/chapters/03-files-paths.md)
- [04. 程序、指令与进程](docs/chapters/04-programs-processes.md)
- [05. 内存里的数据去了哪里](docs/chapters/05-memory.md)
- [06. 终端、命令与运行环境](docs/chapters/06-terminal.md)

### 程序怎样表达逻辑

- [07. 编程语言与程序的运行](docs/chapters/07-languages-runtime.md)
- [08. 变量、值、类型与表达式](docs/chapters/08-values-types.md)
- [09. 条件与循环](docs/chapters/09-control-flow.md)
- [10. 函数、参数与作用域](docs/chapters/10-functions.md)
- [11. 模块、接口与程序组织](docs/chapters/11-modules-interfaces.md)
- [12. 错误与异常](docs/chapters/12-errors.md)
- [13. 等待、异步与并发](docs/chapters/13-concurrency.md)

### 组织数据与解决问题

- [14. 常见数据结构各有什么用](docs/chapters/14-data-structures.md)
- [15. 算法与时间、空间开销](docs/chapters/15-algorithms.md)

### 一次 Web 操作经历了什么

- [16. 设备怎样在网络中找到彼此](docs/chapters/16-network.md)
- [17. 请求、响应与 HTTP](docs/chapters/17-http.md)
- [18. 浏览器、页面与前端](docs/chapters/18-frontend.md)
- [19. 服务器、后端与 API](docs/chapters/19-backend-api.md)
- [20. 数据保存、数据库与 SQL](docs/chapters/20-database.md)
- [21. 索引与事务](docs/chapters/21-indexes-transactions.md)
- [22. 登录、状态与访问权限](docs/chapters/22-identity.md)
- [23. 把一次操作串起来](docs/chapters/23-web-journey.md)

### 软件如何被开发与维护

- [24. 从需求到软件设计](docs/chapters/24-requirements-design.md)
- [25. 读懂一个代码项目的目录](docs/chapters/25-project-layout.md)
- [26. 依赖、包管理、库与框架](docs/chapters/26-dependencies.md)
- [27. Git、版本与协作](docs/chapters/27-git.md)
- [28. 调试、日志与问题定位](docs/chapters/28-debugging.md)
- [29. 测试在检查什么](docs/chapters/29-testing.md)
- [30. 构建、发布与运行环境](docs/chapters/30-build-deploy.md)
- [31. 维护、可靠性与基本安全](docs/chapters/31-maintenance.md)

### 理解 AI 编程

- [32. AI 编程与 Vibe Coding](docs/chapters/32-ai-coding.md)
- [33. 模型、上下文与开发工具](docs/chapters/33-models-context.md)
- [34. 与 AI 讨论需求和修改](docs/chapters/34-ai-collaboration.md)
- [35. 理解 AI 的局限与常见误区](docs/chapters/35-ai-limits.md)

## 阅读与反馈

图示使用 Mermaid 格式，在支持 Mermaid 的 Markdown 阅读器中可直接显示；不支持时仍可结合相邻文字理解流程。代码片段的语言、用途与必要限制在正文中说明。示例采用基础语法与标准库，阅读不需要购买工具或申请账号。

本项目当前交付为 Markdown 正文和本地示例。初稿日期：2026 年 9 月 22 日。具体工具与版本会变化，正文在相关位置给出官方资料链接。

发现错误、链接失效或讲解不清，欢迎按[反馈说明](CONTRIBUTING.md)提出问题。
