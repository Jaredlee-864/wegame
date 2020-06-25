$(function () {
  // 导入cookie封装函数
  let js = document.createElement("script");
  js.src = "../js/cookie-fn.js";
  $("body").append(js);
  //根据cookie判断登陆状态
  if (getCookie("username")) {
    $(".header-right-login:eq(0)").hide();
    $(".header-right-login-info").show();
  }
  $(".header-right-login-figure").mouseover(function () {
    $(".header-right-login-detail").show();
    $(".header-right-login-detail").hover(
      function () {
        $(".header-right-login-detail").show();
      },
      function () {
        $(".header-right-login-detail").hide();
      }
    );
  });
  // 点击注销清除cookie
  $(".header-right-login-todo").click(function () {
    removeCookie("username", { path: "/" });
    $(".header-right-login:eq(0)").show();
    $(".header-right-login-info").hide();
  });
  //划过头像显示用户信息
  $(".header-right-login-figure").mouseout(function () {
    $(".header-right-login-detail").hide();
  });
  //登陆按钮功能
  $(".header-right-login-btn").click(function () {
    $(".widget-login-mask").show();
  });
  //滚动窗口显示回到顶部
  $(window).scroll(function () {
    if ($(window).scrollTop() > 700) {
      $(".gs-top").show();
    } else {
      $(".gs-top").hide();
    }
  });
  //回到顶部点击事件
  $(".gs-top").click(function () {
    console.log(1);
    $(window).scrollTop(0);
    // 缓慢上升动画效果???????????
  });
});
