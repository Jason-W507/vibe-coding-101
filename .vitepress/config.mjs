import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    const s = join(src, entry)
    const d = join(dest, entry)
    if (statSync(s).isDirectory()) {
      copyDir(s, d)
    } else if (!entry.endsWith('.md')) {
      copyFileSync(s, d)
    }
  }
}

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'Vibe Coding 101',
    description: '面向非计算机专业人士的计算机、软件开发与 AI 编程知识教程',
    base: '/vibe-coding-101/',
    cleanUrls: true,
    ignoreDeadLinks: [
      /(?:^|\/)(?:python|sql|frontend)\//,
      /\.scratch\//
    ],
    srcExclude: ['.scratch/**', '.playwright-cli/**', '.playwright-mcp/**', 'node_modules/**'],
    rewrites: {
      'README.md': 'index.md'
    },
    buildEnd(siteConfig) {
      copyDir(join(siteConfig.root, 'examples'), join(siteConfig.outDir, 'examples'))
    },
    themeConfig: {
      nav: [
        { text: '首页与阅读路线', link: '/' },
        { text: '00 全景导览', link: '/docs/chapters/00-overview' },
        { text: '交互式读书进度沙盒', link: '/docs/chapters/23-web-journey#交互式沙盒-演练一次更新请求的完整闭环' },
        { text: '常见问题索引', link: '/docs/questions' },
        { text: '术语速查表', link: '/docs/glossary' },
        { text: '防坑自检清单', link: '/docs/checklist' }
      ],
      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索教程与术语', buttonAriaLabel: '搜索教程与术语' },
            modal: {
              noResultsText: '未找到相关内容',
              resetButtonTitle: '清除查询条件',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
            }
          }
        }
      },
      outline: {
        level: [2, 3],
        label: '本篇小节'
      },
      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },
      sidebar: [
        {
          text: '开始与速查工具',
          items: [
            { text: '教程首页与三条快速路线', link: '/' },
            { text: '00. 一张图看懂计算机、程序与软件开发', link: '/docs/chapters/00-overview' },
            { text: '常见问题索引', link: '/docs/questions' },
            { text: '常见术语与缩写速查表', link: '/docs/glossary' },
            { text: '实战防坑与自检清单', link: '/docs/checklist' },
            { text: '随书示例说明', link: '/examples/README' }
          ]
        },
        {
          text: '一、计算机怎样运行软件',
          collapsed: false,
          items: [
            { text: '01. CPU、内存、磁盘与操作系统', link: '/docs/chapters/01-computer' },
            { text: '02. 数字、文字、图片怎样成为数据', link: '/docs/chapters/02-data-encoding' },
            { text: '03. 文件、目录、路径与权限', link: '/docs/chapters/03-files-paths' },
            { text: '04. 程序、指令与进程', link: '/docs/chapters/04-programs-processes' },
            { text: '05. 内存里的数据去了哪里', link: '/docs/chapters/05-memory' },
            { text: '06. 终端、命令与运行环境', link: '/docs/chapters/06-terminal' }
          ]
        },
        {
          text: '二、程序怎样表达逻辑',
          collapsed: false,
          items: [
            { text: '07. 编程语言与程序的运行', link: '/docs/chapters/07-languages-runtime' },
            { text: '08. 变量、值、类型与表达式', link: '/docs/chapters/08-values-types' },
            { text: '09. 条件与循环', link: '/docs/chapters/09-control-flow' },
            { text: '10. 函数、参数与作用域', link: '/docs/chapters/10-functions' },
            { text: '11. 模块、接口与程序组织', link: '/docs/chapters/11-modules-interfaces' },
            { text: '12. 错误与异常', link: '/docs/chapters/12-errors' },
            { text: '13. 等待、异步与并发', link: '/docs/chapters/13-concurrency' }
          ]
        },
        {
          text: '三、组织数据与解决问题',
          collapsed: false,
          items: [
            { text: '14. 常见数据结构各有什么用', link: '/docs/chapters/14-data-structures' },
            { text: '15. 算法与时间、空间开销', link: '/docs/chapters/15-algorithms' }
          ]
        },
        {
          text: '四、一次 Web 操作经历了什么',
          collapsed: false,
          items: [
            { text: '16. 设备怎样在网络中找到彼此', link: '/docs/chapters/16-network' },
            { text: '17. 请求、响应与 HTTP', link: '/docs/chapters/17-http' },
            { text: '18. 浏览器、页面与前端', link: '/docs/chapters/18-frontend' },
            { text: '19. 服务器、后端与 API', link: '/docs/chapters/19-backend-api' },
            { text: '20. 数据保存、数据库与 SQL', link: '/docs/chapters/20-database' },
            { text: '21. 索引与事务', link: '/docs/chapters/21-indexes-transactions' },
            { text: '22. 登录、状态与访问权限', link: '/docs/chapters/22-identity' },
            { text: '23. 把一次操作串起来（含交互沙盒）', link: '/docs/chapters/23-web-journey' }
          ]
        },
        {
          text: '五、软件如何被开发与维护',
          collapsed: false,
          items: [
            { text: '24. 从需求到软件设计', link: '/docs/chapters/24-requirements-design' },
            { text: '25. 读懂一个代码项目的目录', link: '/docs/chapters/25-project-layout' },
            { text: '26. 依赖、包管理、库与框架', link: '/docs/chapters/26-dependencies' },
            { text: '27. Git、版本与协作', link: '/docs/chapters/27-git' },
            { text: '28. 调试、日志与问题定位', link: '/docs/chapters/28-debugging' },
            { text: '29. 测试在检查什么', link: '/docs/chapters/29-testing' },
            { text: '30. 构建、发布与运行环境', link: '/docs/chapters/30-build-deploy' },
            { text: '31. 维护、可靠性与基本安全', link: '/docs/chapters/31-maintenance' }
          ]
        },
        {
          text: '六、理解 AI 编程',
          collapsed: false,
          items: [
            { text: '32. AI 编程与 Vibe Coding', link: '/docs/chapters/32-ai-coding' },
            { text: '33. 模型、上下文与开发工具', link: '/docs/chapters/33-models-context' },
            { text: '34. 与 AI 讨论需求和修改', link: '/docs/chapters/34-ai-collaboration' },
            { text: '35. 理解 AI 的局限与常见误区', link: '/docs/chapters/35-ai-limits' }
          ]
        },
        {
          text: '参考与反馈',
          collapsed: true,
          items: [
            { text: '参考资料与延伸阅读', link: '/docs/sources' },
            { text: '阅读路线设计说明', link: '/docs/outline' },
            { text: '共同术语定义', link: '/CONTEXT' },
            { text: '反馈说明', link: '/CONTRIBUTING' }
          ]
        }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/Jason-W507/vibe-coding-101' }
      ]
    }
  })
)
