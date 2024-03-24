# Creating a Card Component

:::tip
This feature requires some knowledge of JavaScript development and may be somewhat unstable.

**It is not recommended to use scripts from others as this could lead to your panel being compromised.**
:::

After enabling the design mode in the MCSManager web interface, there is an option `Extension Page Card` when you add a new card. This card allows you to upload your own `HTML` file, which runs directly in the frontend web environment. This is fundamentally different from the `Embedded Web Page Card` because you can access most frontend HTML nodes and operate the API provided by MCSManager.

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

      // Card mount event
      window.$onMounted = function () {
        console.debug("HTML Mounted");

        // If you want to interact with HTML, please write like this
        document.querySelector("#myButton").addEventListener("click");
      };

      // Card unmount event
      window.$onUnmounted = function () {
        console.debug("HTML Unmounted");
      };
    </script>
  </body>
</html>
```

## JavaScript Sandbox Mechanism

To prevent multiple cards from interfering with each other loaded on the same page, MCSManager has created a simple JavaScript sandbox mechanism. Its working principle is to proxy the window object. Any changes you make to the window object will not affect others.

### HTML Card 1

```js
window.$onMounted = function () {
  window.name = "foo"; // Define a global variable
};
```

### HTML Card 2

```js
window.$onMounted = function () {
  setTimeout(() => {
    console.log(window.name); // undefined
  }, 10000);
};
```

## CSS Style Pollution

MCSManager does not isolate CSS styles. It's up to you or other developers to constrain CSS styles. Any definition you make to CSS will affect the entire MCSManager webpage.

## Card API

We provide you with several APIs for use in your script.

```js
window.$onMounted = function () {
  // Card mount complete event.
};
window.$onUnmounted = function () {
  // Card unmount complete event.
};

// Real window object, i.e., the window object of the MCSManager web frontend.
window.$realWindow;

// Axios library for sending requests.
// Reference: https://axios-http.com/docs/example
window.$axios;

// Current MCSManager interface theme, light or dark (light/dark).
window.$theme;
```
