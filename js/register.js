$(function () {
  //图片轮播
  var i = 1;
  setInterval(() => {
    if (i > 4) {
      i = 1;
    }
    $(".left img").attr(
      "src",
      `https://cdn-go.cn/qq-web/zc.qq.com/latest/v3/img/01-${i}.jpg`
    );
    i++;
  }, 2000);

  //点击事件

  $(".input-outer input[type=text]").blur(function () {
    if ($(this).val() == "") {
      $(this).next().text("!用户名不能为空").css({ color: "red" });
    } else {
      $.get(
        `http://jx.xuzhixiang.top/ap/api/checkname.php?username=` +
          $(this).val(),
        function (data) {
          if (data["code"] == 0) {
            $(".input-outer input[type=text]")
              .next()
              .text(`!${data["msg"]}`)
              .css({ color: "red" });
          } else {
            $(".input-outer input[type=text]")
              .next()
              .text(data["msg"])
              .css({ color: "green" });
          }
        }
      );
    }
  });

  $(".input-outer input[type=password]").blur(function () {
    if ($(this).val() == "") {
      $(this).next().html("!密码不能为空").css({ color: "red" });
    } else {
      $(this).next().empty();
    }
  });

  $(".input-outer input[type=text]");
  //提交
  $(".sub input").click(function () {
    $.get(
      "http://jx.xuzhixiang.top/ap/api/reg.php",
      {
        username: $(".input-outer input[type=text]").val(),
        password: $(".input-outer input[type=password]").val(),
      },
      function (data) {
        if (data["code"] == 1) {
          $("<div class='widget-login-mask'></div>").appendTo("body");
          $(".widget-login-mask").load("../html/login.html").show();
          $.getScript("../js/login.js");
        }
      }
    );
    return false;
  });
});
