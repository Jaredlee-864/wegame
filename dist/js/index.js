$(function () {
  $("#body").toggleClass("page-ibanner--mini");
  // .toggleClass("page-ibanner--hide");
  // 搜索框渲染
  $(".tui-search input").on("focus", () => {
    $("#dropdown-menu").show();
    $.getJSON("../data/hotsearch.json", (data) => {
      let obj = data;
      let html = ``;
      obj["data"]["data"].forEach((val, index) => {
        html += `<li class="search-new">
          <div>
            <i class="tag-num num${index + 1}"></i>
            ${val}
          </div>
        </li>`;
      });
      $(".search-assn ul").append(html);
    });
  });
  $(".tui-search-input input").blur(() => {
    $("#dropdown-menu").hide();
  });

  //主banner渲染
  $.getJSON("../data/banner.json", (data) => {
    let obj = data;
    let html = "";
    let arr = obj["data"]["child_list"];
    arr.forEach((val, index) => {
      let link = val["ads_info"]["other_info"];
      link = JSON.parse(link.replace(/\\/g, ""));
      link = link["banner_img"];

      html += `<div class="swiper-slide">
      <a href="/html/prodDetail.html" alt="${val["ads_info"]["ad_title"]}" class = "swiper-slider-link"
        ><img
          src="${link}"
          class="swiper-slide-img"
      /></a>
    </div>`;
    });
    $(".banner-swiper-wrapper").append(html);

    // 创建轮播图
    //滑动到相关li,不切换????????????
    var bannerswiper = new Swiper(".swiper-container1", {
      direction: "vertical",
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "custom",
        renderCustom: function (swiper, index, total) {
          // return current + "of" + total;
          let html = "";
          for (let i = 1; i <= total; i++) {
            let name = $(".swiper-wrapper .swiper-slide")
              .eq(i - 1)
              .find("a")
              .attr("alt");
            let type = "";
            if (arr[i - 1]["ads_info"]["game_top_class"] == 1) {
              type = "活动";
            }
            if (arr[i - 1]["ads_info"]["game_top_class"] == 3) {
              type = "游戏";
            }
            if (index == i) {
              html += `<li class="swiper-menu-li swiper-pagination-custom-active" data-index = "${i}">
                <a href="" class="swiper-menu-link"
                  ><div class="swiper-menu-tit">
                    <strong class="swiper-tag swiper-tag--act"
                      ><span class="swiper-tag-inner">${type}</span>
                      <!----></strong
                    >
                    <strong class="swiper-menu-text">${name}</strong>
                  </div>
                  <p class="swiper-menu-desc">${
                    arr[i - 1]["ads_info"]["ad_subtitle"]
                  }</p></a
                >
              </li>`;
            } else {
              html += `<li class="swiper-menu-li swiper-pagination-custom" data-index = "${i}">
              <a href="" class="swiper-menu-link"
                ><div class="swiper-menu-tit">
                  <strong class="swiper-tag swiper-tag--act"
                    ><span class="swiper-tag-inner">${type}</span>
                    <!----></strong
                  >
                  <strong class="swiper-menu-text">${name}</strong>
                </div>
                <p class="swiper-menu-desc">${
                  arr[i - 1]["ads_info"]["ad_subtitle"]
                }</p></a
              >
            </li>`;
            }
          }
          return html;
        },
      },
      effect: "fade",
      autoplay: {
        delay: 2000,
      },
    });

    //滑动切换到相关图片
    // $.each($(".swiper-pagination li"), function () {
    //   $(this).hover(
    //     () => {
    //       console.log(2);
    //       bannerswiper.autoplay.stop();
    //       let index = $(this).data("index");
    //       // console.log($(this).data("index"));
    //       bannerswiper.slideTo(index, 500, false);
    //     },
    //     function () {
    //       console.log(1);
    //       // console.log($(this));
    //       bannerswiper.autoplay.start();
    //     }
    //   );
    // });
    // $(".swiper-pagination li").mouseover(
    //   function (e) {
    //     e.stopPropagation();
    //     console.log(2);
    //     bannerswiper.autoplay.stop();
    //     let index = $(e.currentTarget).data("index");
    //     console.log($(e.currentTarget).data("index"));
    //     // console.log($(this).data("index"));
    //     bannerswiper.slideTo(index, 500, false);
    //   },
    //   function () {
    //     console.log(1);
    //     // console.log($(this));
    //     bannerswiper.autoplay.start();
    //   }
    // );
    // $(".swiper-pagination li").mouseover(function () {
    //   console.log(1);
    //   let index = $(this).index();
    //   bannerswiper.slideTo(index, 500, false);
    //   // swiper.autoplay.stop();
    //   return false;
    // });
    // $(".swiper-pagination li").mouseout(function () {
    //   console.log(1);
    //   bannerswiper.autoplay.start();
    //   return false;
    // });
  });

  //热点预告区
  $.getJSON("../data/Hotspotpreview.json", (data) => {
    let obj = data;
    let html = "";
    let arr = obj["wegame_appointment"];
    arr.forEach((val, index) => {
      let timestr = val["item_update_time"];
      let month = 0;
      if (timestr.charAt(5) == "0") {
        month = timestr.charAt(6);
      } else {
        month = "1" + timestr.charAt(6);
      }
      let slogon = "";
      // console.log(val["oss_slogan"] == false);
      if (val["oss_slogan"] == false) {
        slogon = val["date_describe"];
        // console.log(val["oss_slogan"]);
      } else {
        slogon = val["oss_slogan"];
      }
      let src = val["cover_pic"];
      html += `<li class="swiper-slide soon">
      <div class="widget-future-game-item">
        <div class="date-flow">
          <div class="date-flow-date"><strong>${month}月</strong></div>
          <div class="date-flow-desc"><span>${slogon}</span></div>
          <div class="date-flow-bg">
            <svg>
              <use xlink:href="#icon-svg-yg-bg" class="svguse-ygbg"></use>
            </svg>
          </div>
        </div>
        <div
          class="widget-gcard widget-gcard--yg we-popover__reference"
          aria-describedby="we-popover-2120"
          tabindex="0"
        >
          <div class="widget-gcard-wp">
            <div class="widget-gcard-cover">
              <a href="/html/prodDetail.html">
                <div class="we-image we-image--square">
                  <img
                    src="${src}"
                    class="we-image-figure"
                  />
                </div>
              </a>
            </div>
            <div class="widget-gcard-info">
              <div class="widget-gcard-tit"><strong>${val["data_name"]}</strong></div>
              <div class="widget-gcard-meta"><span>${slogon}</span></div>
              <!---->
              <div class="widget-gcard-infobtn">
                <div class="widget-gcard-btn gcard-btn-follow _followBtn">
                  <i class="gcard-ico-follow"></i>
                  <div class="widget-gcard-infobtn-text">
                    <span class="widget-gcard-infobtn-text-item txt-item--cur"
                      >已关注</span
                    >
                    <span class="widget-gcard-infobtn-text-item txt-item--normal"
                      >关注</span
                    >
                  </div>
                </div>
                <a href="http://www.wegame.com.cn/store/${val["item_id"]}" class="widget-gcard-btn"
                  ><span>游戏详情</span></a
                >
              </div>
              <div class="forenotice-tag">
                <div class="forenotice-tag-inner"><span>游戏</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>`;
    });
    $(".hot-swiper-wrapper").append(html);

    // 创建轮播图
    let hotswiper = new Swiper(".swiper-container2", {
      slidesPerView: 5,
      spaceBetween: 30,
      // freeMode: true,
      // loop: false,
      effect: "slide",
      // autoplay: {
      //   delay: 2000,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
  //推荐区数据渲染
  $.get("../data/recommend.json", (data) => {
    let html = "";
    let info = data["items"][0];
    html = `<div class="skin-panel-inner">
    <div class="tui-panel-hd">
      <h2 class="tui-panel-tit">蛋蛋君荐游戏</h2>
    </div>
    <div class="tui-panel-bd">
      <div class="dandanjun dandanjun--theme-dark">
        <div class="dandanjun-cont">
          <div class="dandanjun-words">
            <h3 class="dandanjun-tit">
              <a
                href=${info["jump_url"]}
                >${info["title"]}</a
              >
            </h3>
            <div class="dandanjun-desc">
              <p>
                <a
                  href=${info["jump_url"]}
                >
                  ${info["summary"]}
                </a>
              </p>
            </div>
            <div class="dandanjun-viewmore">
              <div class="dandanjun-btn">
                <a href="${info["jump_url"]}" class="btn btn-more"
                  ><span>查看专题</span><i class="ico-arrow-r"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="dandanjun-games">
            <div class="dandanjun-games-tit">
              <div class="dandanjun-games-words">
                <strong class="dandanjun-games-text">本期游戏推荐</strong>
              </div>
              <p class="dandanjun-gtit-desc">
                <span>共</span> <span class="txt-num">3</span> <span>款</span>
              </p>
            </div>
            <div class="dandanjun-glist">
              <div class="tui-slider-wp">
                <div class="viewport">
                  <ul class="tui-slider-list cf">
                  </ul>
                </div>
                <!---->
              </div>
            </div>
          </div>
        </div>
        <div class="dandanjun-bg">
          <div class="dandanjun-bg-ele">
            <div class="we-image we-image--square">
              <img
                src=${info["bg_url"]}
                class="we-image-figure"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    $(".panel-dandanjun").append(html);
    $.get("../data/recommendsmall.json", (data) => {
      let list = "";
      let arr = data["items"];
      arr.forEach((val) => {
        list += `<li class="gs-list-item">
                  <a
                    href="http://www.wegame.com.cn/store/${val["game_id"]}"
                    class="dandanjun-glist-item"
                    ><div class="we-image we-image--square">
                      <img
                        src='${val["poster_url_h"]}'
                        class="we-image-figur"
                      /></div
                  ></a>
                </li>`;
      });
      $(".dandanjun-glist ul").append(list);
      console.log(1);
    });
  });
  // 广告下拉按钮功能
  $(".btn-expand").click(function () {
    $("#body").toggleClass("page-ibanner--mini");
    if ($(".panel-ibanner").css("height") == "130px") {
      $(".panel-ibanner").css({ height: "auto" });
    } else {
      $(".panel-ibanner").css("height", "130px");
    }
    // .toggleClass("page-ibanner--hide");
  });
});
