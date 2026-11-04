# 浏览器、页面与前端

网页中的标题、按钮、输入框和变化的数字，都是浏览器呈现和处理的内容。理解前端，可以从结构、样式和行为怎样配合开始。

## 三种职责怎样放在一起

HTML 描述页面内容与结构，例如标题、段落和按钮。CSS 表达外观与布局规则。JavaScript 可以处理交互、更新页面状态并使用浏览器提供的接口。

这不是说每个页面必须把三种职责分别放进三个文件。它们可以写在同一份 HTML 里，也可以拆分。文件的组织方式与概念上的职责应分别理解。

下面是一个完整的小页面，点击按钮会增加计数。可直接阅读，也可以打开随书附带的[页面示例](../../examples/frontend/counter.html)。

```html
<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>一个前端交互示例</title>
<style>
  body { font-family: sans-serif; max-width: 36rem; margin: 3rem auto; padding: 1rem; }
  button { font: inherit; padding: 0.5rem 1rem; }
</style>
<h1>页面内的计数</h1>
<p>已点击：<output id="count" aria-live="polite">0</output> 次</p>
<button id="add" type="button">增加一次</button>
<p>本例只更新当前页面，刷新后会重新从 0 开始。</p>
<script>
  let count = 0;
  const output = document.querySelector("#count");
  const button = document.querySelector("#add");
  button.addEventListener("click", () => {
    count += 1;
    output.textContent = String(count);
  });
</script>
</html>
```

这里没有需要部署的后端，也没有数据库。读者看到的数字变化发生在浏览器当前页面中。刷新页面时，代码重新开始，计数也会重新初始化。

## 浏览器怎样理解页面

浏览器把 HTML 解析成可以被程序访问的文档结构，通常称为 DOM。样式规则影响元素怎样布局和绘制。JavaScript 可以通过浏览器提供的接口取得元素并修改其内容。

示例里的 `querySelector` 用选择器找到元素，`addEventListener` 登记在点击事件发生时要执行的函数，`textContent` 更新显示的文本。脚本放在相应元素后面，使它运行时这些元素已经被解析。机制可分别参阅 [MDN 的事件监听说明](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)及其页面相关文档。

使用真正的 `button` 元素，也使浏览器能够提供相应的键盘交互和语义。前端不只是颜色与间距，还包括不同使用方式下界面是否可理解、可操作。[MDN 的按钮文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)解释了这种元素的行为。

## 样式与布局：盒子模型、弹性布局与原子化 CSS

前面示例里的 `<style>` 写了 `margin: 3rem auto; padding: 1rem;`。浏览器排版页面时，把每个元素都看成一个矩形**盒子（CSS Box Model，盒子模型）**，由内向外依次是：**内容区（content）→ 内边距（`padding`，内容与边框之间的呼吸空间）→ 边框（`border`）→ 外边距（`margin`，盒子与其他盒子之间的距离）**。遇到页面元素挤在一起、按钮文字贴边或莫名出现横向滚动条时，按 `F12` 选中元素查看盒子模型图，通常立刻就能看清是哪一层尺寸或间距出了问题。

把多个盒子排成整齐的界面，最常用两套现代布局机制：

- **弹性布局（Flexbox，`display: flex`）**：适合按**一维方向**（一行或一列）排列元素，例如让导航栏的“标题靠左、按钮靠右、垂直居中对齐”。
- **网格布局（Grid，`display: grid`）**：适合按**二维行列**排列元素，例如把十几本图书卡片排成自适应宽度的三列书架。

阅读 AI 生成的前端代码时，你还会频繁看到 HTML 标签上写满了一长串简短类名，例如 `class="flex items-center justify-between p-4 rounded border"`。这是近年来非常流行的**原子化 CSS（Utility-First CSS，以 Tailwind CSS 为代表）**：它把常用的单条样式规则预先做成现成的小类名（如 `flex` 对应 `display: flex`，`p-4` 对应 `padding: 1rem`），让开发者或 AI 不用在 HTML 和单独的 `.css` 文件之间来回起名字跳转，就能直接在组件标签上拼出样式。

## 界面变化与数据保存是两件事

页面可以先修改内存中的状态，再更新显示。要让状态在刷新以后仍然存在，需要另行设计保存方式，例如浏览器本地存储（如 `localStorage`，只在当前设备的当前浏览器里有效，用户随时可以查看、修改或清除）或服务端数据库存储（可跨设备共享并由服务端控制权限）。

同样重要的是：**所有发送到浏览器的前端代码、配置和内嵌变量，对访问者都是完全公开可见的。** 任何人按 `F12` 都能查看网页源码、修改页面上的 JavaScript 变量或伪造请求。因此，调用大模型等付费第三方服务的私有 API Key、数据库管理密码等机密凭据，**绝不能直接写在前端代码里**，而应放在后端服务中处理（见[第 19 篇](19-backend-api.md)、[第 30 篇](30-build-deploy.md)）。此外，前面示例使用 `textContent` 更新纯文本是安全的；若直接用 `innerHTML` 把未经处理的用户输入拼进页面，则可能触发**跨站脚本攻击（XSS）**。

即使界面已经显示“保存成功”，也要看这句提示何时产生：是按钮一点击就显示，还是等待服务器确认以后显示。漂亮的反馈文字不能代替实际持久保存的结果。

## 从直接改 DOM 到现代前端框架：组件与响应式状态

在前面的小例子里，每次点击按钮，代码都要手动找到 `#count` 节点并执行 `output.textContent = String(count)`。当页面只有一处数字时这很直观；但如果页面上有 20 张图书卡片、顶部有“总进度统计”、侧边栏还有“未读完筛选器”，每次修改一本书的页数都要手动去寻找并同步更新七八处 DOM 节点，代码很快就会漏改或乱套。

这也是 React、Vue、Svelte 等现代前端框架出现的直接原因。它们围绕两个核心概念组织界面：

- **组件化（Component）与属性（Props）**：把界面拆成可复用的独立积木——比如定义一个 `<BookCard />` 组件，专门负责展示一本书的标题、进度条和“+1 页”按钮。父页面通过**属性（Props）**把不同书的数据传给它，就能用同一套模板渲染出整个书架。AI 生成的项目中常见的 `.jsx` / `.tsx`（React）或 `.vue`（Vue）文件，正是用来把单个组件的 HTML 结构、交互逻辑与样式集中写在一起，再由构建工具转换成浏览器认识的标准 JavaScript。
- **状态驱动视图（`UI = f(state)`）与响应式更新**：你不再编写“先找第 3 个节点、再改它的文字”的命令式步骤，而是声明**“当状态（State）是 X 时，界面应该长什么样”**。这也是新手看 AI 写 React / Vue 代码时最常踩的一个坑：**为什么直接写 `count += 1` 或往数组里 `books.push(...)`，控制台里变量变了，页面却纹丝不动？** 因为普通变量赋值不会通知框架重新渲染界面；必须通过框架约定的响应式入口修改状态（例如 React 中调用 `setCount(count + 1)` 传入新值，或 Vue 中修改响应式引用的 `count.value += 1`），框架才会感知变化并自动更新所有依赖该状态的 DOM 节点。

在页面由谁完成首次组装上，有的应用主要由服务器生成完整 HTML 再交给浏览器显示（常称服务端渲染，**SSR**），有的先发送一个页面骨架，再由浏览器运行 JavaScript 请求数据并渲染界面（常称客户端渲染 **CSR** 或单页应用 **SPA**），也有结合两者的全栈框架（如 Next.js、Nuxt）。前端框架帮助组织组件、状态和渲染时机，但不会取消浏览器 DOM、网络请求和数据保存这些基础机制。

当 AI 生成的页面“不更新”时，可以分别查看代码是否执行、是否通过正确的响应式方式更新了状态、组件是否收到了新属性，以及你打开的是否是使用了当前代码的页面。一个外观现象，可能对应其中任一环节。

> [!TIP]
> **实战提示**：**所有发送到浏览器的前端代码对所有人都是透明的。** 绝不能把大模型付费 API Key 或数据库管理密码直接写进前端代码里。

<!-- navigation -->

---

[上一篇：请求、响应与 HTTP](17-http.md) · [完整目录](../../README.md) · [按问题查阅](../questions.md) · [下一篇：服务器、后端与 API](19-backend-api.md)
