$(function () {
  $(".widget-login-close").click(function () {
    console.log(1);
    $(".widget-login-mask").hide();
  });
  $("#u").focus(function () {
    $("#uin_tips").css("display", "none");
  });
  $("#u").blur(function () {
    if ($("#u").val() == "") {
      $("#uin_tips").css("display", "block");
    }
  });
  $(".password").focus(function () {
    $("#pwd_tips").css("display", "none");
  });
  $(".password").blur(function () {
    if ($(".password").val() == "") {
      $("#pwd_tips").css("display", "block");
    }
  });
  $(".uin_del").click(function () {
    $("#u").val("");
  });
  $(".widget-login-channel").click(function () {
    $(".widget-login-channel--wechat")
      .add(".widget-login-channel--qq")
      .toggleClass("cur");
  });
  $("#login_button").click(function () {
    if ($("#u").val() == "" || $(".password").val() == "") {
      console.log($("#u").val(), $(".password").val());
      alert("用户名或密码不能为空");
    } else {
      $.get(
        "http://jx.xuzhixiang.top/ap/api/login.php",
        {
          username: $("#u").val(),
          password: $(".password").val(),
        },
        function (data) {
          console.log(data);
          if (data["code"] == 0) {
            alert(data["msg"]);
          } else {
            setTimeout(() => {
              location.href = "/html/index.html";
            }, 2000);
          }
        }
      );
    }
    return false;
  });
});
