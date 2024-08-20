# 创建卡组件

:::提示
此功能需要一些JavaScript开发知识，可能有点不稳定。

**不建议使用其他人的脚本，因为这可能会导致您的面板受到损害**
:::

在MCSManager web界面中启用设计模式后，添加新卡时有一个选项“扩展页面卡”。此卡允许您上传自己的“HTML”文件，该文件直接在前端web环境中运行。这与“嵌入式Web卡”有根本不同，因为您可以访问大多数前端HTML节点并操作MCSManager提供的API。

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

      //卡片挂载事件
      window.$onMounted = function () {
        console.debug("HTML Mounted");

        //如果你想与HTML交互，请这样写
        document.querySelector("#myButton").addEventListener("click");
      };

      //卡片卸载事件
      window.$onUnmounted = function () {
        console.debug("HTML Unmounted");
      };
    </script>
  </body>
</html>
```

## JavaScript沙盒机制

为了防止加载在同一页面上的多张卡相互干扰，MCSManager创建了一个简单的JavaScript沙盒机制。其工作原理是代理窗口对象。对窗口对象所做的任何更改都不会影响其他对象。

### HTML 卡片实例1

```js
window.$onMounted = function () {
  window.name = "foo"; // Define a global variable
};
```

### HTML 卡片实例 2

```js
window.$onMounted = function () {
  setTimeout(() => {
    console.log(window.name); // undefined
  }, 10000);
};
```

## CSS样式污染

MCSManager不隔离CSS样式。约束CSS样式取决于您或其他开发人员。您对CSS所做的任何定义都会影响整个MCSManager网页。

## Card API

我们为您的脚本提供了几个API。

```js
window.$onMounted = function () {
  //卡片挂载完成事件。
};
window.$onUnmounted = function () {
  //卡片卸载完成事件。
};

//真实窗口对象，即MCSManager web前端的窗口对象。
window.$realWindow;

//Axios库用于发送请求。
//参考：https://axios-http.com/docs/example
window.$axios;

//当前MCSManager界面主题，亮或暗（亮/暗）。
window.$theme;
```
