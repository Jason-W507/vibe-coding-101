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

## 界面变化与数据保存是两件事

页面可以先修改内存中的状态，再更新显示。要让状态在刷新以后仍然存在，需要另行设计保存方式，例如浏览器本地存储（如 `localStorage`，只在当前设备的当前浏览器里有效，用户随时可以查看、修改或清除）或服务端数据库存储（可跨设备共享并由服务端控制权限）。

同样重要的是：**所有发送到浏览器的前端代码、配置和内嵌变量，对访问者都是完全公开可见的。** 任何人按 `F12` 都能查看网页源码、修改页面上的 JavaScript 变量或伪造请求。因此，调用大模型等付费第三方服务的私有 API Key、数据库管理密码等机密凭据，**绝不能直接写在前端代码里**，而应放在后端服务中处理（见[第 19 篇](19-backend-api.md)、[第 30 篇](30-build-deploy.md)）。此外，前面示例使用 `textContent` 更新纯文本是安全的；若直接用 `innerHTML` 把未经处理的用户输入拼进页面，则可能触发**跨站脚本攻击（XSS）**。

即使界面已经显示“保存成功”，也要看这句提示何时产生：是按钮一点击就显示，还是等待服务器确认以后显示。漂亮的反馈文字不能代替实际持久保存的结果。

## 页面由谁生成

有的应用主要由服务器生成完整 HTML 再交给浏览器显示（常称服务端渲染，**SSR**），有的先发送一个页面框架，再由浏览器运行 JavaScript 请求数据并更新界面（常称客户端渲染 **CSR** 或单页应用 **SPA**），也有结合两种方式的实现。

前端框架帮助开发者组织组件、状态和更新关系，但不会取消浏览器、网络和数据保存这些基础机制。刚接触一个框架时，先辨认它在替你组织哪一类工作，往往比把术语当成全新的世界更容易理解。

当 AI 生成的页面“不更新”时，可以分别查看代码是否执行、状态是否变化、正确元素是否被更新，以及你打开的是否是使用了当前代码的页面。一个外观现象，可能对应其中任一环节。

> [!TIP]
> **实战提示**：**所有发送到浏览器的前端代码对所有人都是透明的。** 绝不能把大模型付费 API Key 或数据库管理密码直接写进前端代码里。

<!-- navigation -->

---

[上一篇：请求、响应与 HTTP](17-http.md) · [完整目录](../../README.md) · [按问题查阅](../questions.md) · [下一篇：服务器、后端与 API](19-backend-api.md)
