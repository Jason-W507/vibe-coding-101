# 参考资料与延伸阅读

正文在具体事实附近提供来源链接。下面按主题列出适合继续查阅的资料，帮助读者找到原始说明。

## 计算机基础

- [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)：经典的操作系统公开教材，深入讲解了进程、内存虚拟化与持久化存储。
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
- [PostgreSQL 索引介绍](https://www.postgresql.org/docs/current/indexes-intro.html)与[事务教程](https://www.postgresql.org/docs/current/tutorial-transactions.html)：清晰解释了数据库索引的读写权衡与事务边界。
- [OWASP 会话管理说明](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)：登录状态与会话机制的深入资料。

## 开发与维护

- [Git 官方参考文档](https://git-scm.com/docs)与 [Pro Git 中文版](https://git-scm.com/book/zh/v2)：命令的完整语义与版本控制实操指南。
- [GitHub：关于 Git](https://docs.github.com/en/get-started/using-git/about-git)与[从仓库中移除敏感数据](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)：版本管理、托管平台与密钥泄露后的处理说明。
- [语义化版本 2.0.0（中文版）](https://semver.org/lang/zh-CN/)：理解 `MAJOR.MINOR.PATCH` 版本号约定。
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)：常见 Web 应用安全风险（注入、越权访问、配置错误等）的权威概览。
- [GitLab：部署与发布](https://docs.gitlab.com/user/get_started/get_started_deploy_release/)：区分软件构建、部署与功能发布的工程概念说明。
- [Dijkstra：The Humble Programmer](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html)：关于程序设计与正确性的一手文章，正文引用其对测试边界的讨论。

## AI 编程

- [Simon Willison：Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/)：作者对术语的明确立场，并转引 Karpathy 的早期描述。
- [Google Cloud：What is vibe coding?](https://cloud.google.com/discover/what-is-vibe-coding)：展示厂商对该词的较宽泛用法。
- [Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)：模型借助工具和环境反馈推进任务的工程说明。
- [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)：关于上下文、信息选择及长期任务记录的工程说明。
- [OpenAI：Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/)：关于模型错误与评价机制的研究说明。
- [OWASP：Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)：外部材料影响模型行为的风险与信任边界。

[返回目录](../README.md) · [按问题查阅](questions.md) · [常见术语速查表](glossary.md) · [防坑自检清单](checklist.md)
