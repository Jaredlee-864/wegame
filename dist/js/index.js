$(function () {
  $(".tui-search input").on("focus", () => {
    $("#dropdown-menu").show();
    $.getJSON({
      url: "./data/hotsearch.json",
      error: (error) => {
        console.log(error);
      },
      success: (data) => {
        console.log(data);
        // let html = ``;
        // let obj = JSON.parse(data, index);
        // obj.data.data.foreach((val) => {
        //   console.log(1);
        //   html += `<li class="search-new">
        //     <div>
        //       <i class="tag-num num${index}"></i>
        //       ${val}
        //     </div>
        //   </li>`;
        // });
        // $(".search-assn ul").append(html);
      },
    });
  });
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
  $(".tui-search-input input").blur(() => {
    $("#dropdown-menu").hide();
  });
});
