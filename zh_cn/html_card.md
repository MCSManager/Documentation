# 制作卡片组件

<tip>
此功能需要一定 JavaScript 开发知识，并且有一定的不稳定性。

**请勿轻易使用其他人的脚本，这可能会导致你的面板被入侵。**
</tip>

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

      window.$onMounted = function () {
        console.debug("HTML Mounted");

        // 如果你要对 HTML 进行交互，请这样写
        document.querySelector("#myButton").addEventListener("click");
      };

      window.$onUnmounted = function () {
        console.debug("HTML Unmounted");
      };
    </script>
  </body>
</html>
```
