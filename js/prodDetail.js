$(function () {
  $.get("../data/gameid-datails.json", (data) => {
    //填数据
    console.log(data["items"]);
    let info = data["items"][0];
    let gamename = info["game_name"];
    let headbg = info["dynamic_background"].replace(/\\/g, "");
    let time = info["item_update_time"].split(" ")[0];
    let headbgurl = JSON.parse(headbg).url;
    $(".tui-crumb").find("li:eq(1)").text(gamename);
    $(".detail-cover").find("img").attr({
      src: info["poster_url_v"],
      alt: gamename,
    });
    $(".detail-introduce h1").attr("title", gamename).text(gamename);
    $(".detail-name-thin strong").text(gamename);
    $(".detail-banner img").attr("src", headbgurl);
    $(".game-detail-inner").find("div").html(info["description"]);
    $(".tx-clip:eq(0)").text(info["developer"]);
    $(".tui-tipsbox:eq(1)").text(info["developer"]);
    $(".tui-tips-text").text(info["developer_name"]);
    $(".detail-td-profession:eq(0) .tui-tipsbox:eq(0) span").text(time);
    $(".basic-mem").text(info["basic_config_mem"] + " GB");
    $(".basic-gpu").text(info["basic_config_gpu"] + "以上");
    $(".basic-disk").text(info["basic_config_disk"] + " GB");
    $(".basic-cpu").text(info["basic_config_cpu"] + "以上B");
    $(".basic-sys").text(info["sys_opera"]);
  });
  $.get("../data/gamedetail-updata&activities.json", (data) => {
    //填数据
    let infoarr = data["data"]["article_list"];
    let html = "";
    infoarr.forEach((val) => {
      html += `<div class="widget-updates-box">
        <div class="widget-updates-box-innner">
          <div class="tui-figure">
            <div class="figure">
              <img
                src="${val["cover"]}"
              />
              <div class="forenotice-tag forenotice-tag--sm">
                <div class="forenotice-tag-inner">
                  <span>更新</span>
                </div>
              </div>
            </div>
            <div class="figure-info">
              <h3 class="figure-info-tit">
                ${val["title"]}
              </h3>
              <p class="figure-summary">
              ${val["abstract"]}
              </p>
              <div class="figure-other">
                <p class="item update--talks">
                  <i class="ico-update-talk"></i>25
                </p>
                <p class="item">发布于 ${val["send_date"]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
    $(".tui-panel-bd:eq(1)").html(html);
  });
});
