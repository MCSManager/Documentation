(function (window) {
  // Main
  console.log("XZ", window.location.hash);
  if (
    window.navigator.language.includes("zh") &&
    (window.location.hash === "#/" || !window.location.hash)
  ) {
    window.location.href = "/#/zh-cn/";
  }
})(window);
