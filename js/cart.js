$(function () {
  // 插入头部尾部
  $("<header></header>").insertBefore("body div:first");
  $("header").load("../html/header.html", function () {});
  $("<div class='widget-login-mask'></div>").appendTo("body");
  $(".widget-login-mask").load("../html/login.html");
  $.getScript("../js/login.js");
  $.getScript("../js/common.js");

  //   let ftTotalNum = $(".price-pre-counts .widget-price-new:first");
  //从接口获取购物车数据并渲染
  let uid = getCookie("username");
  let html = "";
  $.get(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${uid}`, function (
    data
  ) {
    data["data"].forEach((val) => {
      html += ` <div class="gcell widget-gcell" >
      <div class="gcell-inner">
        <div class="gcell-hd">
          <label class="we-checkbox"
            ><input
              type="checkbox"
              id="checkbox"
              checked
              class="we-checkbox-original"
          /></label>
        </div>
        <div class="gcell-bd">
          <div class="gamecell">
            <div class="gamecell-hd">
              <a
                href="/html/prodDetail.html"
                class="gcell-image-link"
                ><div
                  class="we-image we-image--square we-image--progressive"
                >
                  <img
                    src=${val["pimg"]}
                  /></div
              ></a>
            </div>
            <div class="gamecell-bd">
              <h3 class="gamecell-tit">
                <a
                  href="/store/2000916?from=cart.index_list.title_0"
                  class="gcell-tit-link"
                  ><span class="gamecell-game-tit"
                    >${val["pname"]}</span
                  ></a
                >
              </h3>
              <div class="gamecell-meta">
                <div class="gamecell-meta-item">
                  <span class="gamecell-date"
                    >2019-03-05 发售</span
                  >
                </div>
                <!---->
              </div>
              <!---->
            </div>
            <div class="gamecell-ft">
              <div class="widget-price widget-price--light">
                <div class="widget-price-text">
                  <strong class="widget-price-new"
                    ><span class="widget-price-mint">¥</span>
                    <span class="widget-price-val"
                      ><em>${val["pprice"]}</em></span
                    ></strong
                  >
                  <del class="widget-price-old"
                    ><span class="widget-price-mint">¥</span>
                    <span class="widget-price-val"
                      ><em>${val["pprice"] * 2}</em></span
                    ></del
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gcell-ft">
          <div class="gcell-slot-group">
            <div class="gcell-slot-item slot-item-del" data-pid=${val["pid"]}>
              <a title="移除" class="gcart-btn gcart-btn-del"
                ><i class="gcart-icon gcart-icon--del"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    });
    $(".widget-gcell-list").append(html);
    let del = $(".slot-item-del");
    let totalprodele = $(".text-number-tips");
    let shouldpayele = $(".widget-price-val:last em");
    let totalnumberele = $(".price-pre-counts-txt");
    let totalpriceele = $(".price-pre-counts-txt").next();
    let checkboxele = $("input:checkbox");
    let checkedboxele = $("input:checked");
    //   商品总个数计算
    totalprodele.text(`共${$(".widget-gcell").length}款内容`);

    //   初始化默认全选,计算总价
    let totalprice = 0;
    for (let i = 0; i < checkedboxele.length; i++) {
      totalprice += Number(
        $(`.widget-gcell:eq(${i}) .widget-price-val:eq(0) em`).text()
      );
    }
    shouldpayele.text(totalprice);
    totalnumberele.text(checkedboxele.length);
    totalpriceele.text(`款内容合计:${totalprice}`);
    $(".we-button").toggleClass("disabled");
    $(".widget-price--thin:first").hide();
    //点选计算总价以及各种相关功能
    checkboxele.click(function () {
      let checkedboxele = $("input:checked");
      let totalprice = 0;
      for (let i = 0; i < checkedboxele.length; i++) {
        totalprice += Number(
          $(`.widget-gcell:eq(${i}) .widget-price-val:eq(0) em`).text()
        );
      }
      if (checkedboxele.length === 0) {
        $(".we-button").addClass("disabled");
      } else {
        $(".we-button").removeClass("disabled");
      }
      totalnumberele.text(checkedboxele.length);
      shouldpayele.text(totalprice);
      totalpriceele.text(`款内容合计: ${totalprice}`);
      if (totalprice == 0) {
        totalprice = "--";
        totalpriceele.text(`款内容合计: ${totalprice}`);
      }
    });
    //删除按钮功能
    del.click(function () {
      $(this).parent().parent().parent().parent().remove();
      totalprodele.text(`共${$(".widget-gcell").length}款内容`);
      let checkedboxele = $("input:checked");
      let totalprice = 0;
      for (let i = 0; i < checkedboxele.length; i++) {
        totalprice += Number(
          $(`.widget-gcell:eq(${i}) .widget-price-val:eq(0) em`).text()
        );
      }
      if (checkedboxele.length === 0) {
        $(".we-button").addClass("disabled");
      } else {
        $(".we-button").removeClass("disabled");
      }
      totalnumberele.text(checkedboxele.length);
      shouldpayele.text(totalprice);
      totalpriceele.text(`款内容合计: ${totalprice}`);
      if (totalprice == 0) {
        totalprice = "--";
        totalpriceele.text(`款内容合计: ${totalprice}`);
      }
      $.get(
        "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
        {
          uid: uid,
          pid: $(this).data("pid"),
        },
        function (data, status) {}
      );
    });
  });
});
