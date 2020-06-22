$(function () {
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
            <a href="https://www.wegame.com.cn/store/'${val["game_id"]}'">${val["game_name"]}</a>
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
});
