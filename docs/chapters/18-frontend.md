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

页面可以先修改内存中的状态，再更新显示。要让状态在刷新以后仍然存在，需要另行设计保存方式，例如浏览器存储或服务端存储。

即使界面已经显示“保存成功”，也要看这句提示何时产生：是按钮一点击就显示，还是等待服务器确认以后显示。漂亮的反馈文字不能代替实际持久保存的结果。

## 页面由谁生成

有的应用主要由服务器生成 HTML 再交给浏览器显示，有的先发送一个页面框架，再由浏览器请求数据并更新界面，也有结合两种方式的实现。

前端框架帮助开发者组织组件、状态和更新关系，但不会取消浏览器、网络和数据保存这些基础机制。刚接触一个框架时，先辨认它在替你组织哪一类工作，往往比把术语当成全新的世界更容易理解。

当 AI 生成的页面“不更新”时，可以分别查看代码是否执行、状态是否变化、正确元素是否被更新，以及你打开的是否是使用了当前代码的页面。一个外观现象，可能对应其中任一环节。

<!-- navigation -->

---

[上一篇：请求、响应与 HTTP](17-http.md) · [完整目录](../../README.md) · [按问题查阅](../questions.md) · [下一篇：服务器、后端与 API](19-backend-api.md)
