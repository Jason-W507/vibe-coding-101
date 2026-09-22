# 常见问题索引

这里按遇到的困惑提供阅读入口。可以先读最相关的一篇，再根据其中的链接补充前置概念；不需要为了查一个问题先读完全书。

| 我想弄清楚的问题 | 从哪里读起 | 接下来可以看什么 |
| --- | --- | --- |
| AI 给了我代码，为什么还不能直接使用？ | [代码怎样成为运行中的程序](chapters/07-languages-runtime.md) | [终端与运行环境](chapters/06-terminal.md)、[依赖与包管理](chapters/26-dependencies.md) |
| 内存、磁盘、CPU 分别做什么？为什么“内存满了”和“磁盘满了”不同？ | [计算机的组成](chapters/01-computer.md) | [内存里的数据](chapters/05-memory.md) |
| 文字为什么会乱码？图片怎么也能成为数字？ | [数据与编码](chapters/02-data-encoding.md) | [文件与扩展名](chapters/03-files-paths.md) |
| 文件明明在那里，为什么提示找不到？ | [路径与权限](chapters/03-files-paths.md) | [工作目录与 PATH](chapters/06-terminal.md) |
| 为什么关闭终端后，网页就打不开了？ | [程序、进程与线程](chapters/04-programs-processes.md) | [后端服务](chapters/19-backend-api.md)、[部署](chapters/30-build-deploy.md) |
| 变量名、引号、括号、缩进分别在表达什么？ | [变量、值与类型](chapters/08-values-types.md) | [条件与循环](chapters/09-control-flow.md)、[函数](chapters/10-functions.md) |
| 为什么改了一个变量，另一个地方也变了？ | [名称与对象](chapters/08-values-types.md) | [作用域](chapters/10-functions.md)、[模块与对象](chapters/11-modules-interfaces.md) |
| 页面卡住就是 CPU 太慢吗？异步和多线程是什么关系？ | [等待、异步与并发](chapters/13-concurrency.md) | [进程与线程](chapters/04-programs-processes.md)、[调试与定位](chapters/28-debugging.md) |
| 列表、字典、集合为什么不能随便换着用？ | [数据结构的用途](chapters/14-data-structures.md) | [算法与开销](chapters/15-algorithms.md) |
| 数据少时很快，多了为什么变慢？ | [算法与复杂度](chapters/15-algorithms.md) | [数据库索引](chapters/21-indexes-transactions.md)、[运行证据](chapters/28-debugging.md) |
| 域名、IP、端口和 localhost 是什么？ | [网络寻址](chapters/16-network.md) | [HTTP 请求与响应](chapters/17-http.md) |
| 前端、后端、API、数据库到底谁负责什么？ | [一次操作的完整过程](chapters/23-web-journey.md) | [前端](chapters/18-frontend.md)、[后端](chapters/19-backend-api.md)、[数据库](chapters/20-database.md) |
| 页面说保存成功，刷新后为什么又没了？ | [界面状态与数据保存](chapters/18-frontend.md) | [持久化](chapters/20-database.md)、[失败发生在哪一层](chapters/23-web-journey.md) |
| 为什么几个数据修改要放在同一个事务里？ | [索引与事务](chapters/21-indexes-transactions.md) | [重试与可靠性](chapters/31-maintenance.md) |
| 登录后为什么仍可能没有权限？HTTPS 能保证什么？ | [身份与访问权限](chapters/22-identity.md) | [HTTP 与 HTTPS](chapters/17-http.md)、[信任边界](chapters/31-maintenance.md) |
| 项目里这么多文件，我先看哪里？ | [项目目录](chapters/25-project-layout.md) | [模块职责](chapters/11-modules-interfaces.md)、[依赖](chapters/26-dependencies.md) |
| “需求”“设计”“实现”为什么要分别讨论？ | [从需求到设计](chapters/24-requirements-design.md) | [与 AI 讨论修改](chapters/34-ai-collaboration.md) |
| 保存文件、Git 提交和上传代码有什么区别？ | [Git、版本与协作](chapters/27-git.md) | [构建与部署](chapters/30-build-deploy.md) |
| 报错应该从哪里看？为什么删掉报错代码不一定修好了？ | [错误与异常](chapters/12-errors.md) | [调试方法](chapters/28-debugging.md)、[AI 的常见误区](chapters/35-ai-limits.md) |
| 测试通过了，为什么还会出问题？ | [测试的作用与边界](chapters/29-testing.md) | [维护与观察](chapters/31-maintenance.md) |
| 本地能用，为什么上线失败？ | [构建、发布与环境](chapters/30-build-deploy.md) | [配置与依赖](chapters/26-dependencies.md)、[维护](chapters/31-maintenance.md) |
| AI coding 和 Vibe Coding 是一回事吗？ | [术语与使用方式](chapters/32-ai-coding.md) | [模型与工具](chapters/33-models-context.md) |
| AI 为什么看不到文件、记不住要求，或者只是说自己做完了？ | [上下文、记忆与工具执行](chapters/33-models-context.md) | [协作与验证](chapters/34-ai-collaboration.md)、[局限与证据](chapters/35-ai-limits.md) |
| 我不会独立写代码，怎样描述需求和判断修改？ | [与 AI 讨论需求和修改](chapters/34-ai-collaboration.md) | [全景导览](chapters/00-overview.md)、[AI 的局限](chapters/35-ai-limits.md) |

[返回完整目录](../README.md) · [示例说明](../examples/README.md) · [反馈疑问](../CONTRIBUTING.md)
