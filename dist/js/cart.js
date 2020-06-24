$(function () {
  let totalprodele = $(".text-number-tips");
  let shouldpayele = $(".widget-price-val:last em");
  let totalnumberele = $(".price-pre-counts-txt");
  let totalpriceele = $(".price-pre-counts-txt").next();
  let checkboxele = $("input:checkbox");
  let checkedboxele = $("input:checked");
  //   let ftTotalNum = $(".price-pre-counts .widget-price-new:first");

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
      console.log(1);
      $(".we-button").addClass("disabled");
    } else {
      $(".we-button").removeClass("disabled");
    }
    totalnumberele.text(checkedboxele.length);
    shouldpayele.text(totalprice);
    totalpriceele.text(`款内容合计:${totalprice}`);

    if (totalpriceele.text() == "0") {
      $(".widget-price--thin:first").show();
      console.log(1);
    } else {
      $(".widget-price--thin:first").hide();
    }
  });
});
