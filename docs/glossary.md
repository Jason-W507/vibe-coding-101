# 常见术语与缩写速查表

当你看到 AI 的回答、终端报错或项目文档里冒出陌生词时，可以先在这里查一句话解释，再点进对应专题看完整来龙去脉。

## 计算机、系统与终端

| 术语 / 缩写 | 一句话人话解释 | 详见专题 |
| --- | --- | --- |
| **CPU（处理器）** | 负责执行指令、做算术和逻辑判断的硬件核心。 | [第 01 篇](chapters/01-computer.md) |
| **RAM（内存）** | 程序运行时的临时工作台，读写极快，但断电或进程结束即清空。 | [第 01 篇](chapters/01-computer.md)、[第 05 篇](chapters/05-memory.md) |
| **进程（Process）与 PID** | 正在运行中的一次程序活动；PID 是系统分配给这次运行的临时编号。 | [第 04 篇](chapters/04-programs-processes.md) |
| **线程（Thread）** | 进程内部可并发推进的一条执行路线，同一进程内的线程共享内存。 | [第 04 篇](chapters/04-programs-processes.md) |
| **调用栈（Call Stack）** | 记录函数“谁调用了谁、返回到哪里”的栈结构；无限递归会导致栈溢出。 | [第 05 篇](chapters/05-memory.md)、[第 12 篇](chapters/12-errors.md) |
| **堆（Heap）** | 用于存放生命周期更灵活、可跨函数共享的动态分配数据的内存区域。 | [第 05 篇](chapters/05-memory.md) |
| **UTF-8 / GBK** | 文字编码规则。UTF-8 是跨平台通用标准，GBK 是中文 Windows 传统编码，混用会乱码。 | [第 02 篇](chapters/02-data-encoding.md) |
| **CRLF / LF** | 换行符：Windows 传统用 `CRLF (\r\n)`，macOS / Linux 用 `LF (\n)`。 | [第 02 篇](chapters/02-data-encoding.md) |
| **绝对路径 / 相对路径** | 从盘符或根目录 `/` 出发的完整位置叫绝对路径；从“当前工作目录”出发的叫相对路径。 | [第 03 篇](chapters/03-files-paths.md) |
| **终端与 Shell** | 终端是文字交互窗口；Shell（如 PowerShell、Bash、Zsh、cmd）是在里面解释命令的程序。 | [第 06 篇](chapters/06-terminal.md) |
| **环境变量与 `PATH`** | 运行环境传给程序的键值对；`PATH` 存放系统查找可执行命令的目录列表。 | [第 06 篇](chapters/06-terminal.md) |
| **退出码（Exit Code）** | 程序结束时返回给系统的整数，按惯例 `0` 表示成功，非 `0` 表示出错。 | [第 06 篇](chapters/06-terminal.md) |

## 编程语言、逻辑与数据结构

| 术语 / 缩写 | 一句话人话解释 | 详见专题 |
| --- | --- | --- |
| **编译 / 解释 / 运行时** | 把源码转成目标格式叫编译；边读边执行叫解释；支撑程序跑起来的环境叫运行时（如 Node.js）。 | [第 07 篇](chapters/07-languages-runtime.md) |
| **动态类型与类型注解** | Python/JS 中类型属于运行时的值而非变量名；Python 类型注解仅供提示和静态检查，运行时不拦截。 | [第 08 篇](chapters/08-values-types.md) |
| **`None` / `null` / `undefined`** | 表示“空缺 / 没有值”，不同于数字 `0` 或空字符串 `""`。 | [第 08 篇](chapters/08-values-types.md) |
| **作用域（Scope）** | 一个变量名字在代码中能被直接访问的有效范围（如函数内部 vs 模块全局）。 | [第 10 篇](chapters/10-functions.md) |
| **副作用（Side Effect）** | 函数除了计算返回值之外，还改变了外部状态（如写文件、发请求、改数据库或改传入的可变对象）。 | [第 10 篇](chapters/10-functions.md) |
| **回溯信息（Traceback）** | 程序未捕获异常时打印的“从入口一路调用到报错行”的堆栈记录。 | [第 12 篇](chapters/12-errors.md) |
| **异步（`async` / `await`）与 `Promise`** | 等待网络或磁盘时不卡死当前线程、稍后拿到结果再继续的编程机制。 | [第 13 篇](chapters/13-concurrency.md) |
| **竞态条件（Race Condition）** | 多个并发操作交错读写同一份状态，导致结果因执行先后巧合而出错。 | [第 13 篇](chapters/13-concurrency.md) |
| **时间复杂度（如 $O(n)$、$O(1)$）** | 描述当输入数据规模 $n$ 变大时，算法所需操作次数增长快慢的趋势。 | [第 15 篇](chapters/15-algorithms.md) |

## 网络、Web 与数据库

| 术语 / 缩写 | 一句话人话解释 | 详见专题 |
| --- | --- | --- |
| **IP / 域名 / DNS** | IP 是网络寻址编号；域名是好记的名字；DNS 负责把域名查成对应的 IP 地址。 | [第 16 篇](chapters/16-network.md) |
| **端口（Port）** | 区分同一台机器上不同网络服务的数字编号（如 HTTP 默认 `80`、HTTPS `443`、开发常用 `3000`/`5173`/`8000`）。 | [第 16 篇](chapters/16-network.md) |
| **`localhost` / `127.0.0.1` / `0.0.0.0`** | 前两者代表“访问当前这台机器自己”；`0.0.0.0` 用于服务端配置“监听本机所有网卡连接”。 | [第 16 篇](chapters/16-network.md) |
| **HTTP 方法與状态码** | 方法表达意图（`GET` 读、`POST` 提交、`PATCH` 局部改、`DELETE` 删）；状态码表达结果（`200` 成功、`401` 未登录、`403` 无权限、`404` 不存在、`500` 服务端异常）。 | [第 17 篇](chapters/17-http.md) |
| **幂等（Idempotent）** | 同一个请求重复执行多次，对系统资源状态产生的影响与执行一次相同（不会重复扣款或重复插记录）。 | [第 17 篇](chapters/17-http.md)、[第 23 篇](chapters/23-web-journey.md) |
| **CORS（跨域资源共享）** | 浏览器的同源安全限制：前端页面请求不同端口或域名的后端接口时，需要后端显式返回允许头或配置同源代理。 | [第 17 篇](chapters/17-http.md) |
| **DOM** | 浏览器把 HTML 解析成的树形对象结构，JavaScript 通过修改 DOM 来改变页面显示。 | [第 18 篇](chapters/18-frontend.md) |
| **SSR / CSR / SPA** | SSR 是服务器生成好 HTML 再发给浏览器；CSR/SPA 是浏览器拿到骨架后用 JS 请求数据并渲染页面。 | [第 18 篇](chapters/18-frontend.md) |
| **API（接口）与路由** | 程序之间约定的调用入口与数据格式；路由决定哪个请求地址交给哪段后端函数处理。 | [第 11 篇](chapters/11-modules-interfaces.md)、[第 19 篇](chapters/19-backend-api.md) |
| **JSON** | 用文本表示“对象（键值对）”和“数组（列表）”的跨语言通用数据交换格式。 | [第 14 篇](chapters/14-data-structures.md)、[第 17 篇](chapters/17-http.md) |
| **主键（Primary Key）与外键（Foreign Key）** | 主键唯一标识表里的一行记录；外键引用另一张表的主键以约束关联关系。 | [第 20 篇](chapters/20-database.md)、[第 21 篇](chapters/21-indexes-transactions.md) |
| **SQL 注入（SQL Injection）** | 把用户输入直接拼接进 SQL 字符串，导致输入内容被当成数据库命令执行的高危漏洞；需用参数化查询防范。 | [第 20 篇](chapters/20-database.md) |
| **索引（Index）与事务（Transaction）** | 索引是用额外结构加快查询；事务保证一组数据库修改“要么全部成功提交，要么全部回滚撤销”。 | [第 21 篇](chapters/21-indexes-transactions.md) |
| **认证（AuthN）与授权（AuthZ）** | 认证解决“你是谁（登录）”；授权解决“你能不能动这条数据（权限）”。 | [第 22 篇](chapters/22-identity.md) |
| **Cookie / Session / JWT** | 跨请求维持登录身份的常见机制；注意 JWT 载荷默认只是 Base64 编码，任何人可解码查看。 | [第 22 篇](chapters/22-identity.md) |
| **XSS / CSRF / IDOR** | 三大常见 Web 漏洞：XSS 是页面注入恶意脚本；CSRF 是借浏览器自动带 Cookie 冒充发请求；IDOR 是改 URL 编号越权读写他人记录。 | [第 18 篇](chapters/18-frontend.md)、[第 19 篇](chapters/19-backend-api.md)、[第 22 篇](chapters/22-identity.md)、[第 31 篇](chapters/31-maintenance.md) |
| **RLS（行级安全策略）** | Supabase 等数据库按当前用户身份限制“只能读写自己那几行数据”的数据库级权限规则。 | [第 19 篇](chapters/19-backend-api.md) |

## 软件工程与 AI 编程

| 术语 / 缩写 | 一句话人话解释 | 详见专题 |
| --- | --- | --- |
| **虚拟环境（如 `.venv`）** | 为当前 Python 项目单独隔离出一套解释器与第三方包目录，避免不同项目互相污染。 | [第 25 篇](chapters/25-project-layout.md)、[第 26 篇](chapters/26-dependencies.md) |
| **语义化版本（SemVer）与 Lock 文件** | `主.次.修订` 版本号约定；lock 文件（如 `package-lock.json`）精确锁定所有依赖版本以保证多处安装一致。 | [第 26 篇](chapters/26-dependencies.md) |
| **包名幻觉（Slopsquatting）** | AI 编造出不存在的包名，攻击者抢注同名恶意包诱使开发者安装的风险。 | [第 26 篇](chapters/26-dependencies.md) |
| **工作区 / 暂存区 / Commit / Diff** | Git 中正在改的文件叫工作区；准备提交的叫暂存区；`commit` 是存盘点；`diff` 是前后改动逐行对比。 | [第 27 篇](chapters/27-git.md) |
| **回归测试（Regression Test）** | 修改代码后重新运行已有检查，确认“修好新问题时没有把旧功能改坏”。 | [第 29 篇](chapters/29-testing.md) |
| **构建（Build）与 CI/CD** | 构建是把源码打包转换成可交付产物；CI/CD 是在提交代码后自动运行检查、构建与部署的流水线。 | [第 30 篇](chapters/30-build-deploy.md) |
| **Token 与上下文窗口** | 模型由分词器（tokenizer）切分处理的文本片段叫 token；单次对话与文件能塞进模型的总量上限叫上下文窗口。 | [第 33 篇](chapters/33-models-context.md) |
| **智能体（Agent）与 MCP** | 能自主循环调用工具（读文件、跑命令）并根据反馈行动的 AI 系统；MCP 是连接外部工具与数据源的通用协议。 | [第 33 篇](chapters/33-models-context.md) |
| **`AGENTS.md` / `CLAUDE.md`** | 放在项目根目录、让 AI 工具每次自动读取的项目结构、运行命令与禁止事项说明文件。 | [第 33 篇](chapters/33-models-context.md) |
| **幻觉与提示注入（Prompt Injection）** | 幻觉是模型用肯定语气编造不存在的函数或事实；提示注入是外部不可信文本夹带指令劫持 AI 行为。 | [第 35 篇](chapters/35-ai-limits.md) |

[返回完整目录](../README.md) · [常见问题索引](questions.md) · [防坑自检清单](checklist.md)
