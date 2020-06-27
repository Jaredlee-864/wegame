$(function () {
  // 插入头部尾部和侧边导航
  $("<header></header>").insertBefore("body div:first");
  $("<footer></footer>").appendTo("body");
  $("<div class='gsider'></div>").appendTo("body");
  $("<div class='widget-login-mask'></div>").appendTo("body");
  $("header").load("../html/header.html", function () {
    // let js = document.createElement("script");
    // js.src = "../js/common.js";
    // $("body").append(js);
  });
  $("footer").load("../html/footer.html");
  $(".gsider").load("../html/gsider.html", function () {
    $(".gsider-button-index").hide();
    $(".gsider-button-bottom")
      .addClass("gsider-line")
      .css({ paddingBottom: "8px" });
  });
  $(".widget-login-mask").load("../html/login.html");

  $.getScript("../js/login.js");
  $.getScript("../js/common.js");
  // 顶部轮播图
  $.get("../data/depage-swiper.json", function (data) {
    let html = "";
    let arr = data["items"];
    arr.forEach((val) => {
      html += `<div class="swiper-slide">
        <div class="figure">
          <img
            src=${val["poster_url_h"]}
            alt=${val["name"]}
            class="pic"
          />
        </div>
        <div class="figure-info">
          <h3 class="figure-info-tit">
            <a href="/html/prodDetail.html">${val["game_name"]}</a>
          </h3>
          <div class="figure-other cf">
            <div class="item f-left">
              <div class="tui-price">
                <span class="price-new"
                  ><i>¥</i>
                  56
                </span>
              </div>
            </div>
            <div class="item f-right"></div>
          </div>
        </div>
      </div>`;
    });
    $(".swiper-wrapper").append(html);

    let swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

  //商品列表渲染
  $.get("../data/depage-resultlist.json", function (data) {
    let html = "";
    let arr = data["items"];
    arr.forEach((val) => {
      let release_time = val["publish_time"].split(" ")[0];
      html += `<li>
      <div class="gamecard-item">
        <a href="/html/prodDetail.html" class="figure" target = "_blank"
          ><img
            alt="${val["game_name"]}"
            src="${val["poster_url_h"]}"
            class="pic"
        /></a>
        <div class="figure-info tui-table-box">
          <div class="table-row">
            <div class="table-cell">
              <div class="gamecard-desc">
                <h3 class="gamecard-tit">
                  <a href="/html/prodDetail.html" title="${val["game_name"]}"
                  target = "_blank">${val["game_name"]}</a
                  >
                </h3>
                <p class="gamecard-subtit">
                  <span class="txt-num">${release_time} 上线</span>
                  <span class="user-praise">
                    推荐率
                    <i class="txt-num">66.8%</i></span
                  >
                </p>
                <div class="tui-label">
                  <a
                    href="/store/games?from=store_index.more_game.game_list&amp;tag=MMORPG"
                    >MMORPG</a
                  ><a
                    href="/store/games?from=store_index.more_game.game_list&amp;tag=moba"
                    >moba</a
                  ><a
                    href="/store/games?from=store_index.more_game.game_list&amp;tag=%E7%94%B5%E5%AD%90%E7%AB%9E%E6%8A%80"
                    >电子竞技</a
                  ><a
                    href="/store/games?from=store_index.more_game.game_list&amp;tag=%E4%B8%89%E5%9B%BD"
                    >三国</a
                  >
                </div>
              </div>
            </div>
            <div class="table-cell">
              <div class="gamecard-other">
                <div class="tui-price">
                  <span class="price-new"
                    ><em class="pricetag-current">免费</em></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>`;
    });
    $(".gameList").append(html);
  });

  // 插入商品数据
  // $.post(
  //   "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php",
  //   {
  //     pimg: "https://p.qpic.cn/wegame/0/oss_59117670a66d5.jpg/180 ",
  //     pname: "仙侠世界2",
  //     pprice: 16,
  //     pdesc: "仙侠世界2",
  //     uid: 34479,
  //   },
  //   function (data) {
  //     console.log(data);
  //   }
  // );
  // $.get("http://jx.xuzhixiang.top/ap/api/goods/goods-update.php", {
  //   pimg:
  //     "https://p.qpic.cn/wegame/0/b3337be80f5042cfdcd816a5c5a41ed3.jpg/180 ",
  //   pname: "传送门骑士",
  //   pprice: 68,
  //   pdesc: "传送门骑士",
  //   pid: 209812,
  // });
});
