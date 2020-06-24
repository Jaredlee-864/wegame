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
$(".header-right-login-figure").mouseout(function () {
  $(".header-right-login-detail").hide();
});
