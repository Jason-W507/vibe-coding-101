# Vibe Coding 实战防坑与自检清单

这份清单把全书 36 篇的核心判断浓缩成四个阶段的核对项。每次和 AI 协作开发、排查故障或准备把应用分享给别人之前，可以花两分钟对照打勾。

## 一、 开始新项目或接手项目时

- [ ] **路径干净**：项目放在纯英文、无空格、且不被网盘（如 OneDrive）实时同步锁定的目录下（如 `D:\projects\my-app`）。（[第 03 篇](chapters/03-files-paths.md)）
- [ ] **看见全名**：已在系统文件管理器中开启“显示文件扩展名”与“显示隐藏文件”，能直接看到 `.env`、`.gitignore`。([第 03 篇](chapters/03-files-paths.md))
- [ ] **分清 Shell**：看清终端提示符是 PowerShell（`PS C:\>`）、`cmd` 还是 Bash/Zsh（`$` / `%`），不把 Linux 专用命令直接粘进 Windows PowerShell。（[第 06 篇](chapters/06-terminal.md)）
- [ ] **环境隔离**：Python 项目已创建并激活虚拟环境（`.venv/`），Node.js 项目依赖装在项目本地 `node_modules/`，并用 `.gitignore` 忽略了 `.venv/`、`node_modules/` 和 `.env`。（[第 25 篇](chapters/25-project-layout.md)、[第 26 篇](chapters/26-dependencies.md)）
- [ ] **建立规则文件**：在项目根目录准备一份简短的 `AGENTS.md`（或 `CLAUDE.md`），写明项目目录职责、启动命令、测试命令与禁止事项。（[第 33 篇](chapters/33-models-context.md)）

## 二、 让 AI 修改代码的过程中

- [ ] **改动前先存档**：在让 AI 做较大修改前，先运行 `git status` 确认干净，并做一次 `git commit`（或新建分支），随时可用 `git restore .` 后悔。（[第 27 篇](chapters/27-git.md)、[第 34 篇](chapters/34-ai-collaboration.md)）
- [ ] **先看计划再写代码**：复杂需求先让 AI 列出实施计划、涉及的文件和边界假设（Plan 模式），人工确认后再动手改代码。（[第 24 篇](chapters/24-requirements-design.md)、[第 34 篇](chapters/34-ai-collaboration.md)）
- [ ] **一次只做一件事**：不把“改界面样式、改数据库结构、升级依赖”混在同一次指令里。（[第 34 篇](chapters/34-ai-collaboration.md)）
- [ ] **核实陌生依赖包**：AI 建议安装未听说过的第三方包时，先去 `pypi.org` 或 `npmjs.com` 确认包真实存在且非仿冒，防范包名幻觉（slopsquatting）。（[第 26 篇](chapters/26-dependencies.md)）
- [ ] **拦截高危命令**：开启工具的命令审批确认，绝不让 AI 自动执行 `rm -rf`、`git reset --hard`、`git clean -fd`、`git push --force` 或直接操作生产数据库。（[第 27 篇](chapters/27-git.md)、[第 33 篇](chapters/33-models-context.md)）
- [ ] **验收看 `git diff` 与真实运行**：不轻信 AI 口头说的“已修复”，必看 `git diff` 是否误删了已有逻辑、是否用了 `except Exception: pass` 吞掉异常、是否篡改了测试断言。（[第 12 篇](chapters/12-errors.md)、[第 29 篇](chapters/29-testing.md)、[第 35 篇](chapters/35-ai-limits.md)）

## 三、 遇到报错或功能失效卡住时

- [ ] **复制完整证据**：把完整的报错回溯（Traceback 从头到最后一行）或浏览器 `F12` 控制台中展开的红字交给 AI，而不是只截半句。（[第 12 篇](chapters/12-errors.md)、[第 28 篇](chapters/28-debugging.md)）
- [ ] **按链路逐层定位**：网页操作没反应时，打开浏览器 `F12` 的 **Network** 面板，确认：① 请求发出去没有？② 状态码是 `4xx`、`5xx` 还是 `CORS` 拦截？③ 响应体里写了什么？④ 刷新页面后数据还在不在？（[第 17 篇](chapters/17-http.md)、[第 23 篇](chapters/23-web-journey.md)、[第 28 篇](chapters/28-debugging.md)）
- [ ] **止损重开会话**：如果 AI 在同一个 bug 上连改三次越改越复杂，立即 `git restore` 退回干净状态，整理好复现步骤与关键报错，开启一个全新对话。（[第 33 篇](chapters/33-models-context.md)、[第 34 篇](chapters/34-ai-collaboration.md)）

## 四、 推送代码到 GitHub 或部署上线前（安全底线）

- [ ] **源码与 Git 历史无密钥**：确认 `.env` 没有被纳入版本库（`git status` / `git diff --cached`）；若不慎把 API Key 提交并推送到了公开仓库，**立即去服务商后台作废（Revoke）并轮换新密钥**，而不是只删文件重提。（[第 27 篇](chapters/27-git.md)）
- [ ] **前端代码无私有密钥**：确认大模型付费 API Key、数据库管理密码（如 `service_role` key）没有写在前端代码里，也没有放在 `VITE_`、`NEXT_PUBLIC_`、`REACT_APP_` 开头的环境变量中；并在付费 API 后台设置了每月用量上限（spend limit）。（[第 18 篇](chapters/18-frontend.md)、[第 30 篇](chapters/30-build-deploy.md)）
- [ ] **后端独立做权限、参数化与回调签名校验**：确认后端接口不仅检查“是否登录（认证）”，还检查“该记录是否属于当前用户（授权 / 防 IDOR）”；SQL 查询全部使用参数化占位符而非字符串拼接（防 SQL 注入）；接收第三方 Webhook 的接口校验了数字签名与幂等去重；若使用 Supabase 等托管后端，每张表均已开启并验证 **RLS（行级安全策略）**。（[第 19 篇](chapters/19-backend-api.md)、[第 20 篇](chapters/20-database.md)、[第 22 篇](chapters/22-identity.md)）
- [ ] **明确线上数据与文件存储位置**：确认线上应用没有把需要长期保留的用户数据或上传的图片/文件写进 Serverless 或容器的临时本地文件系统，而是分别存入了云端数据库与对象存储（S3 / R2 / Supabase Storage），并且数据库有独立备份与恢复方案。（[第 20 篇](chapters/20-database.md)、[第 30 篇](chapters/30-build-deploy.md)、[第 31 篇](chapters/31-maintenance.md)）

[返回完整目录](../README.md) · [常见问题索引](questions.md) · [常见术语速查表](glossary.md)
