$(function () {
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
      <a href="/store/48" alt="${val["ads_info"]["ad_title"]}" class = "swiper-slider-link"
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
              html += `<li class="swiper-menu-li swiper-pagination-custom-active">
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
              html += `<li class="swiper-menu-li swiper-pagination-custom">
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
    // });
    // $(".swiper-pagination li").hover(
    //   function () {
    //     console.log($(this));
    //     let index = $(this).index();
    //     swiper.slideTo(index, 500, false);
    //     swiper.autoplay.stop();
    //   },
    //   function () {
    //     console.log(1);
    //     // console.log($(this));
    //     swiper.autoplay.start();
    //   }
    // );
    $(".swiper-pagination li").mouseover(function () {
      console.log(1);
      let index = $(this).index();
      bannerswiper.slideTo(index, 500, false);
      // swiper.autoplay.stop();
      return false;
    });
    $(".swiper-pagination li").mouseout(function () {
      console.log(1);
      bannerswiper.autoplay.start();
      return false;
    });
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
              <a href="/store/54">
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
  //登陆按钮功能
  $(".header-right-login-btn").click(function () {
    $(".widget-login-mask").show();
    // location.href = "../html/login.html";
  });
});
