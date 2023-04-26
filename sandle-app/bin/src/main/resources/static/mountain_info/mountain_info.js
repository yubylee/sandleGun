getAll(1);

$(function () {
  $("#tabs").tabs();
});

const template = Handlebars.compile(
  document.querySelector("#accordion-template").innerHTML
);

const template2 = Handlebars.compile(
  document.querySelector("#accordion-template2").innerHTML
);

function getAll(keyword) {
  let qs = "";
  if (keyword) {
    qs = `?keyword=${keyword}`;
  }

  fetch("../mountainInfos" + qs)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result.data);
      if ($(".accordion").hasClass("ui-accordion")) {
        $(".accordion").accordion("destroy");
      }
      $(".accordion").html(template(result.data));
      $(".accordion").accordion({
        collapsible: true,
      });
      map();
    });
}

function getRegion(e) {
  var regionId = e.target.getAttribute("regionId");

  fetch("../mountainInfos/region/" + regionId)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result.data);
      if ($(".accordion").hasClass("ui-accordion")) {
        $(".accordion").accordion("destroy");
      }
      $(".accordion").html(template(result.data));
      $(".accordion").accordion({
        collapsible: true,
      });
      if (regionId == 1) {
        seoulMap();
      } else if (regionId == 2) {
        incheonMap();
      } else if (regionId == 3) {
        daejeonMap();
      } else if (regionId == 4) {
        daeguMap();
      } else if (regionId == 5) {
        gwangjuMap();
      } else if (regionId == 6) {
        ulsanMap();
      } else if (regionId == 7) {
        busanMap();
      } else if (regionId == 8) {
        gyeonggiMap();
      } else if (regionId == 9) {
        gangwonMap();
      } else if (regionId == 10) {
        chungbukMap();
      } else if (regionId == 11) {
        chungnamMap();
      } else if (regionId == 12) {
        jeonbukMap();
      } else if (regionId == 13) {
        jeonnamMap();
      } else if (regionId == 14) {
        gyeongbukMap();
      } else if (regionId == 15) {
        gyeongnamMap();
      } else if (regionId == 16) {
        sejongMap();
      } else if (regionId == 17) {
        jejuMap();
      }
    });
}

function getAddress(e) {
  var regionId = e.target.getAttribute("regionId");
  var title = e.target.getAttribute("title");

  fetch("../mountainInfos/region/" + regionId + "/" + title)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result.data);
      if ($(".accordion").hasClass("ui-accordion")) {
        $(".accordion").accordion("destroy");
      }
      $(".accordion").html(template2(result.data));
      $(".accordion").accordion({
        collapsible: true,
      });
    });
}

function getMountainInfo() {}

function map() {
  document.getElementById("map").style.display = "inline-block";
  document.getElementById("height_list").style.display = "inline-block";
  document.getElementById("seoul-map").style.display = "none";
  document.getElementById("height_list_seoul").style.display = "none";
  document.getElementById("incheon-map").style.display = "none";
  document.getElementById("height_list_incheon").style.display = "none";
  document.getElementById("daejeon-map").style.display = "none";
  document.getElementById("height_list_daejeon").style.display = "none";
  document.getElementById("daegu-map").style.display = "none";
  document.getElementById("height_list_daegu").style.display = "none";
  document.getElementById("gwangju-map").style.display = "none";
  document.getElementById("height_list_gwangju").style.display = "none";
  document.getElementById("ulsan-map").style.display = "none";
  document.getElementById("height_list_ulsan").style.display = "none";
  document.getElementById("busan-map").style.display = "none";
  document.getElementById("height_list_busan").style.display = "none";
  document.getElementById("gyeonggi-map").style.display = "none";
  document.getElementById("height_list_gyeonggi").style.display = "none";
  document.getElementById("gangwon-map").style.display = "none";
  document.getElementById("height_list_gangwon").style.display = "none";
  document.getElementById("chungbuk-map").style.display = "none";
  document.getElementById("height_list_chungbuk").style.display = "none";
  document.getElementById("chungnam-map").style.display = "none";
  document.getElementById("height_list_chungnam").style.display = "none";
  document.getElementById("jeonbuk-map").style.display = "none";
  document.getElementById("height_list_jeonbuk").style.display = "none";
  document.getElementById("jeonnam-map").style.display = "none";
  document.getElementById("height_list_jeonnam").style.display = "none";
  document.getElementById("gyeongbuk-map").style.display = "none";
  document.getElementById("height_list_gyeongbuk").style.display = "none";
  document.getElementById("gyeongnam-map").style.display = "none";
  document.getElementById("height_list_gyeongnam").style.display = "none";
  document.getElementById("sejong-map").style.display = "none";
  document.getElementById("height_list_sejong").style.display = "none";
  document.getElementById("jeju-map").style.display = "none";
  document.getElementById("height_list_jeju").style.display = "none";
}

function seoulMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("seoul-map").style.display = "inline-block";
  document.getElementById("height_list_seoul").style.display = "inline-block";
}

function incheonMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("incheon-map").style.display = "inline-block";
  document.getElementById("height_list_incheon").style.display = "inline-block";
}

function daejeonMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("daejeon-map").style.display = "inline-block";
  document.getElementById("height_list_daejeon").style.display = "inline-block";
}

function daeguMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("daegu-map").style.display = "inline-block";
  document.getElementById("height_list_daegu").style.display = "inline-block";
}

function gwangjuMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("gwangju-map").style.display = "inline-block";
  document.getElementById("height_list_gwangju").style.display = "inline-block";
}

function ulsanMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("ulsan-map").style.display = "inline-block";
  document.getElementById("height_list_ulsan").style.display = "inline-block";
}

function busanMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("busan-map").style.display = "inline-block";
  document.getElementById("height_list_busan").style.display = "inline-block";
}

function gyeonggiMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("gyeonggi-map").style.display = "inline-block";
  document.getElementById("height_list_gyeonggi").style.display =
    "inline-block";
}

function gangwonMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("gangwon-map").style.display = "inline-block";
  document.getElementById("height_list_gangwon").style.display = "inline-block";
}

function chungbukMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("chungbuk-map").style.display = "inline-block";
  document.getElementById("height_list_chungbuk").style.display =
    "inline-block";
}

function chungnamMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("chungnam-map").style.display = "inline-block";
  document.getElementById("height_list_chungnam").style.display =
    "inline-block";
}

function jeonbukMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("jeonbuk-map").style.display = "inline-block";
  document.getElementById("height_list_jeonbuk").style.display = "inline-block";
}

function jeonnamMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("jeonnam-map").style.display = "inline-block";
  document.getElementById("height_list_jeonnam").style.display = "inline-block";
}

function gyeongbukMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("gyeongbuk-map").style.display = "inline-block";
  document.getElementById("height_list_gyeongbuk").style.display =
    "inline-block";
}

function gyeongnamMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("gyeongnam-map").style.display = "inline-block";
  document.getElementById("height_list_gyeongnam").style.display =
    "inline-block";
}

function sejongMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("sejong-map").style.display = "inline-block";
  document.getElementById("height_list_sejong").style.display = "inline-block";
}

function jejuMap() {
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";
  document.getElementById("jeju-map").style.display = "inline-block";
  document.getElementById("height_list_jeju").style.display = "inline-block";
}
