# 制作卡片组件

:::tip
此功能需要一定 JavaScript 开发知识，并且有一定的不稳定性。

**请勿轻易使用其他人的脚本，这可能会导致你的面板被入侵。**
:::

开启 MCSManager 网页界面的设计后，新增卡片时有一个 `扩展页面卡片`，这个卡片支持你上传自己的 `HTML` 文件，并且直接运行在前端网页环境中，这和 `内嵌网页卡片` 有着本质上的区别，因为你可以访问到绝大部分前端 HTML 节点，以及操作 MCSManager 给予你的 API。

```html
<!DOCTYPE html>
<html>
  <body>
    <div>
      <h1>Hello World</h1>
      <button id="myButton">Button</button>
      <!-- 不要在 HTML 使用 JavaScript 中的函数 -->
      <!-- <button id="myButton" onClick="handleClick()">Button</button> -->
    </div>
    <script>
      function handleClick() {
        console.debug("Button click!");
      }

      // 卡片挂载事件
      window.$onMounted = function () {
        console.debug("HTML Mounted");

        // 如果你要对 HTML 进行交互，请这样写
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

为了防止多个卡片载入到同一个页面互相干扰，MCSManager 制作了一个简易的 JavaScript 沙盒机制，它的工作原理就是代理 `window` 对象，你对 `window` 对象的所有更改都不会影响到其他人。

### HTML 卡片 1

```js
window.$onMounted = function () {
  window.name = "foo"; // 定义全局变量
};
```

### HTML 卡片 2

```js
window.$onMounted = function () {
  setTimeout(() => {
    console.log(window.name); // undefined
  }, 10000);
};
```

## CSS 样式污染

MCSManager 并没有对 CSS 样式进行隔离，需要你自己或者其他开发者自己约束 CSS 样式，你对 CSS 样式的任何定义都会影响 MCSManager 整个网页。

## 卡片 API

我们为你提供了几个 API 供你在脚本中使用。

```js
window.$onMounted = function () {
  // 卡片加载完毕事件。
};
window.$onUnmounted = function () {
  // 卡片卸载完毕事件。
};

// 真实 window 对象，即 MCSManager 网页前端的 window 对象。
window.$realWindow;

// Axios 库，可用于发送请求。
// 使用方法参考：https://axios-http.com/docs/example
window.$axios;

// 当前 MCSManager 界面主题，浅色或深色（light/dark）。
window.$theme;
```
