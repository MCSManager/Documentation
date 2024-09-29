# 创建卡组件

:::tip
此功能需要一些 JavaScript 开发知识。

**不建议使用其他人的脚本，因为这可能会导致您的面板受到损害**
:::

在 MCSManager web 界面中启用设计模式后，添加新卡时有一个选项“扩展页面卡”。此卡允许您上传自己的 “HTMK” 文件，该文件直接在前端 web 环境中运行。这与“嵌入式 Web 卡”有根本不同，因为您可以访问大多数前端 HTML 节点并操作 MCSManager 提供的 API 。

```html
<!DOCTYPE html>
<html>
  <body>
    <div>
      <h1>Hello World</h1>
      <button id="myButton">Button</button>
      <!-- Do not use JavaScript functions in HTML -->
      <!-- <button id="myButton" onClick="handleClick()">Button</button> -->
    </div>
    <script>
      function handleClick() {
        console.debug("Button click!");
      }

      // 卡片挂载事件
      window.$onMounted = function () {
        console.debug("HTML Mounted");

        // 如果你想与 HTML 交互，请这样写
        document.querySelector("#myButton").addEventListener("click");
      };

      // 卡片卸载事件
      window.$onUnmounted = function () {
        console.debug("HTML Unmounted");
      };
    </script>
  </body>
</html>
```

## JavaScript 沙盒机制

为了防止加载在同一页面上的多张卡相互干扰， MCSManager 创建了一个简单的 JavaScript 沙盒机制。其工作原理是代理窗口对象。对窗口对象所做的任何更改都不会影响其他对象。

### HTML 卡片实例1

```js
window.$onMounted = function () {
  window.name = "foo"; // 定义一个全局变量
};
```

### HTML 卡片实例 2

```js
window.$onMounted = function () {
  setTimeout(() => {
    console.log(window.name);  // 输出 undefined，因为卡片1的js脚本不会污染到其他任何卡片
  }, 10000);
};
```

## CSS 样式污染

MCSManager 不隔离 CSS 样式。约束 CSS 样式取决于您或其他开发人员。您对 CSS 所做的任何定义都会影响整个 MCSManager 网页。

## Card API

我们为您的脚本提供了几个 API。

```js
window.$onMounted = function () {
  // 卡片挂载完成事件。
};
window.$onUnmounted = function () {
  // 卡片卸载完成事件。
};

// 真实窗口对象，即 MCSManager web 前端的窗口对象。
window.$realWindow;

// Axios 库用于发送请求。
//参考：https://axios-http.com/docs/example
window.$axios;

//当前 MCSManager 界面主题，亮或暗（亮/暗）。
window.$theme;
```
