# 随书示例

这些文件与正文里的代码对应，供阅读或可选运行。它们是各自独立的小例子，不组成一套需要完成的课程项目。Python 与网页示例从正文逐字提取，SQL 文件连接了两篇的示例，并明确启用 SQLite 外键检查。

## Python：观察一小段逻辑

使用 Python 3，每个文件独立运行，不安装第三方包。初稿作者使用 CPython 3.14.4 验证；这不是最低版本声明。可在项目根目录的终端中运行（例如 `python examples/python/07-languages-runtime-01.py`，macOS / Linux 上常见为 `python3 ...`）。不同系统的解释器启动名称可能不同，应以自己的环境为准。

控制台的显示结果与对应正文一起阅读。第 13 篇的异步示例以独立脚本运行；在 Jupyter 等已经有运行中事件循环的笔记本环境里，直接调用 `asyncio.run(main())` 会报错，需改为直接 `await main()`。

| 文件 | 对应正文 |
| --- | --- |
| [07-languages-runtime-01.py](python/07-languages-runtime-01.py) | [编程语言与程序的运行](../docs/chapters/07-languages-runtime.md) |
| [08-values-types-01.py](python/08-values-types-01.py) | [变量、值、类型与表达式](../docs/chapters/08-values-types.md) |
| [08-values-types-02.py](python/08-values-types-02.py) | [变量、值、类型与表达式](../docs/chapters/08-values-types.md) |
| [08-values-types-03.py](python/08-values-types-03.py) | [变量、值、类型与表达式](../docs/chapters/08-values-types.md) |
| [08-values-types-04.py](python/08-values-types-04.py) | [变量、值、类型与表达式](../docs/chapters/08-values-types.md) |
| [09-control-flow-01.py](python/09-control-flow-01.py) | [条件与循环](../docs/chapters/09-control-flow.md) |
| [09-control-flow-02.py](python/09-control-flow-02.py) | [条件与循环](../docs/chapters/09-control-flow.md) |
| [09-control-flow-03.py](python/09-control-flow-03.py) | [条件与循环](../docs/chapters/09-control-flow.md) |
| [10-functions-01.py](python/10-functions-01.py) | [函数、参数与作用域](../docs/chapters/10-functions.md) |
| [10-functions-02.py](python/10-functions-02.py) | [函数、参数与作用域](../docs/chapters/10-functions.md) |
| [11-modules-interfaces-01.py](python/11-modules-interfaces-01.py) | [模块、接口与程序组织](../docs/chapters/11-modules-interfaces.md) |
| [12-errors-01.py](python/12-errors-01.py) | [错误与异常](../docs/chapters/12-errors.md) |
| [13-concurrency-01.py](python/13-concurrency-01.py) | [等待、异步与并发](../docs/chapters/13-concurrency.md) |
| [14-data-structures-01.py](python/14-data-structures-01.py) | [常见数据结构各有什么用](../docs/chapters/14-data-structures.md) |
| [14-data-structures-02.py](python/14-data-structures-02.py) | [常见数据结构各有什么用](../docs/chapters/14-data-structures.md) |
| [29-testing-01.py](python/29-testing-01.py) | [测试在检查什么](../docs/chapters/29-testing.md) |

## 浏览器：观察页面状态

用浏览器打开 [counter.html](frontend/counter.html)，点击“增加一次”观察数字变化，再刷新观察计数归零。该文件不使用外部依赖、网络接口或数据库，可离线打开。对应[第 18 篇](../docs/chapters/18-frontend.md)。

## SQL：观察数据库中的记录

[reading-notes.sql](sql/reading-notes.sql)适用于 SQLite。可以在安装了 `sqlite3` 命令行工具的终端中对新建数据库执行（例如运行跨平台通用的 `sqlite3 notes.db ".read examples/sql/reading-notes.sql"`），也可以只阅读 SQL 与对应讲解。不要放进已有业务数据库执行；文件会创建两张示例表，再写入和修改演示记录。注意：部分图形界面工具或脚本接口在执行时会自动包裹外层事务，若直接运行含 `BEGIN;` 的整份脚本可能提示 `cannot start a transaction within a transaction`。

运行后，`books` 中两本书的已读页数分别为 60 和 0，`reading_events` 中有一条 `(1, 60)` 记录。整份文件按顺序执行一次；对同一个数据库再次执行会因表已存在而报错。对应[第 20 篇](../docs/chapters/20-database.md)与[第 21 篇](../docs/chapters/21-indexes-transactions.md)。

正文第 20 篇展示的约束主要说明空值与数值范围，普通 SQLite 表的 `INTEGER` 声明本身并不会强制所有输入都采用整数存储类型。真实应用若要求严格整数，还需匹配输入校验与数据库约束（如 SQLite `STRICT` 表）。

[返回目录](../README.md) · [按问题查阅](../docs/questions.md)
