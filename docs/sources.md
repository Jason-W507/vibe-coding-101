# 参考资料与延伸阅读

正文在具体事实附近提供来源链接。下面按主题列出适合继续查阅的资料，帮助读者找到原始说明，而不是把它们作为读完整本教程的前置任务。初稿核验日期为 **2026 年 9 月 22 日**；线上文档的内容与版本可能继续变化。

## 计算机基础

- [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)：操作系统教材。正文选用了进程、内存与虚拟化相关章节；完整教材的技术深度高于本教程。
- [Unicode：UTF 与字节序标记常见问题](https://www.unicode.org/faq/utf_bom.html)：区分字符编码与字节表示。
- [NIST：二进制倍数前缀](https://physics.nist.gov/cuu/Units/binary.html)：了解 KiB、MiB 等单位与十进制单位的差异。
- [Microsoft：进程与线程](https://learn.microsoft.com/en-us/windows/win32/procthread/processes-and-threads)：以 Windows 为例查看相关系统概念。
- [PowerShell：管理当前位置](https://learn.microsoft.com/en-us/powershell/scripting/samples/managing-current-location)：与终端一篇中的工作目录和命令示例对应。

## 程序与算法

- [Python 数据模型](https://docs.python.org/3/reference/datamodel.html)：对象、类型与运行机制的参考资料。
- [Python 教程](https://docs.python.org/3/tutorial/)：可按需查找流程控制、函数、模块和异常的完整说明。
- [Python 浮点运算说明](https://docs.python.org/3/tutorial/floatingpoint.html)：解释二进制浮点与十进制显示之间的关系。
- [Python 异步任务文档](https://docs.python.org/3/library/asyncio-task.html)：对应协程与等待的短示例。
- [Open Data Structures](https://opendatastructures.org/ods-python/)：数据结构的原理与实现教材。
- [Algorithms, 4th Edition：算法与数据结构参考表](https://algs4.cs.princeton.edu/cheatsheet/)：查阅特定结构和算法的性能条件，使用时应同时注意假设与实现差异。

## Web 与数据

- [RFC 9110：HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)：HTTP 方法、状态码等语义的标准来源。
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)：浏览器、HTML、CSS、JavaScript 与 Web API 的参考入口；正文给出对应条目。
- [SQLite 建表语法](https://www.sqlite.org/lang_createtable.html)与[查询语法](https://www.sqlite.org/lang_select.html)：对应随书 SQL 示例。
- [PostgreSQL 索引介绍](https://www.postgresql.org/docs/current/indexes-intro.html)与[事务教程](https://www.postgresql.org/docs/current/tutorial-transactions.html)：帮助理解索引成本和事务边界，不意味着随书示例要求安装 PostgreSQL。
- [OWASP 会话管理说明](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)：登录状态与会话机制的深入资料。

## 开发与维护

- [Git 官方参考文档](https://git-scm.com/docs)：命令的完整语义，应结合工作区、暂存区与仓库理解。
- [GitHub：关于 Git](https://docs.github.com/en/get-started/using-git/about-git)：版本管理与托管平台的基本区别。
- [GitLab：部署与发布](https://docs.gitlab.com/user/get_started/get_started_deploy_release/)：以一个平台的工作方式说明相关概念；正文不要求使用该平台。
- [Dijkstra：The Humble Programmer](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html)：关于程序设计与正确性的一手文章，正文引用其对测试边界的讨论。

## AI 编程

- [Simon Willison：Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/)：作者对术语的明确立场，并转引 Karpathy 的早期描述。初稿未能直接取得 X 原帖正文，因此没有把转引标成直接读取原帖。
- [Google Cloud：What is vibe coding?](https://cloud.google.com/discover/what-is-vibe-coding)：展示厂商对该词的较宽泛用法；不作为工具效果或学习效果的保证。
- [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)：模型借助工具和环境反馈推进任务的工程说明。
- [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)：关于上下文、信息选择及长期任务记录的工程说明。
- [OpenAI：Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/)：关于模型错误与评价机制的研究说明。
- [OWASP：Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)：外部材料影响模型行为的风险与信任边界。

本教程的场景、解释和代码示例为围绕读者需求组织的正文，并非以上资料的逐章翻译。厂商文章用于支持其公开定义或机制说明，不代表所有产品都采用同样的实现。

[返回目录](../README.md) · [按问题查阅](questions.md)
