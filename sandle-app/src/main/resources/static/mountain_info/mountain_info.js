getAll(1, 1);

$(function () {
  $("#tabs").tabs();
});

// Handlebars

const template = Handlebars.compile(
  document.querySelector("#accordion-template").innerHTML
);

const template2 = Handlebars.compile(
  document.querySelector("#page-template").innerHTML
);

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

// mountain_info

function getAll(keyword, page) {
  const perPage = 20;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
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
      const pageNo = result.data.map((item) => item.no);
      console.log(pageNo);
      const divs = [
        ...new Set(pageNo.map((n) => Math.floor((n - 1) / 20 + 1))),
      ].map((q) => ({ no: q })); // 20으로 나눈 몫 추출 후 중복값 제거 및 no : 숫자 형식으로 담기
      console.log(divs);

      if ($(".accordion").hasClass("ui-accordion")) {
        $(".accordion").accordion("destroy");
      }
      $(".accordion").html(template(result.data.slice(startIndex, endIndex)));
      $(".accordion").accordion({
        collapsible: true,
        active: false,
      });
      $(".page").html(template2(divs));
      map();
    });
}

function getRegion(e) {
  document.querySelector(".page").style.display = "none";
  const regionId = e.target.getAttribute("regionId");
  document.getElementById("map").style.display = "none";
  document.getElementById("height_list").style.display = "none";

  if (regionId == 1) {
    document.getElementById("seoul-map").style.display = "inline-block";
    document.getElementById("height_list_seoul").style.display = "inline-block";
  } else if (regionId == 2) {
    document.getElementById("incheon-map").style.display = "inline-block";
    document.getElementById("height_list_incheon").style.display =
      "inline-block";
  } else if (regionId == 3) {
    document.getElementById("daejeon-map").style.display = "inline-block";
    document.getElementById("height_list_daejeon").style.display =
      "inline-block";
  } else if (regionId == 4) {
    document.getElementById("daegu-map").style.display = "inline-block";
    document.getElementById("height_list_daegu").style.display = "inline-block";
  } else if (regionId == 5) {
    document.getElementById("gwangju-map").style.display = "inline-block";
    document.getElementById("height_list_gwangju").style.display =
      "inline-block";
  } else if (regionId == 6) {
    document.getElementById("ulsan-map").style.display = "inline-block";
    document.getElementById("height_list_ulsan").style.display = "inline-block";
  } else if (regionId == 7) {
    document.getElementById("busan-map").style.display = "inline-block";
    document.getElementById("height_list_busan").style.display = "inline-block";
  } else if (regionId == 8) {
    document.getElementById("gyeonggi-map").style.display = "inline-block";
    document.getElementById("height_list_gyeonggi").style.display =
      "inline-block";
  } else if (regionId == 9) {
    document.getElementById("gangwon-map").style.display = "inline-block";
    document.getElementById("height_list_gangwon").style.display =
      "inline-block";
  } else if (regionId == 10) {
    document.getElementById("chungbuk-map").style.display = "inline-block";
    document.getElementById("height_list_chungbuk").style.display =
      "inline-block";
  } else if (regionId == 11) {
    document.getElementById("chungnam-map").style.display = "inline-block";
    document.getElementById("height_list_chungnam").style.display =
      "inline-block";
  } else if (regionId == 12) {
    document.getElementById("jeonbuk-map").style.display = "inline-block";
    document.getElementById("height_list_jeonbuk").style.display =
      "inline-block";
  } else if (regionId == 13) {
    document.getElementById("jeonnam-map").style.display = "inline-block";
    document.getElementById("height_list_jeonnam").style.display =
      "inline-block";
  } else if (regionId == 14) {
    document.getElementById("gyeongbuk-map").style.display = "inline-block";
    document.getElementById("height_list_gyeongbuk").style.display =
      "inline-block";
  } else if (regionId == 15) {
    document.getElementById("gyeongnam-map").style.display = "inline-block";
    document.getElementById("height_list_gyeongnam").style.display =
      "inline-block";
  } else if (regionId == 16) {
    document.getElementById("sejong-map").style.display = "inline-block";
    document.getElementById("height_list_sejong").style.display =
      "inline-block";
  } else if (regionId == 17) {
    document.getElementById("jeju-map").style.display = "inline-block";
    document.getElementById("height_list_jeju").style.display = "inline-block";
  }

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
        active: false,
      });
    });
}

function getAddress(e) {
  const regionId = e.target.getAttribute("regionId");
  const title = e.target.getAttribute("title");

  fetch("../mountainInfos/region/" + regionId + "/" + encodeURI(title))
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
        active: false,
      });
    });
}

function getMountainInfo(e) {
  document.querySelector(".page").style.display = "none";
  const photo = e.target.getAttribute("photo");
  const regionId = e.target.getAttribute("regionId");
  const title = e.target.getAttribute("title");

  document.getElementById("tabs").style.display = "none";

  if (document.getElementById("map")) {
    document.getElementById("map").style.display = "none";
  }
  if (document.getElementById("seoul-map")) {
    document.getElementById("seoul-map").style.display = "none";
  }
  if (document.getElementById("incheon-map")) {
    document.getElementById("incheon-map").style.display = "none";
  }
  if (document.getElementById("daejeon-map")) {
    document.getElementById("daejeon-map").style.display = "none";
  }
  if (document.getElementById("daegu-map")) {
    document.getElementById("daegu-map").style.display = "none";
  }
  if (document.getElementById("gwangju-map")) {
    document.getElementById("gwangju-map").style.display = "none";
  }
  if (document.getElementById("ulsan-map")) {
    document.getElementById("ulsan-map").style.display = "none";
  }
  if (document.getElementById("busan-map")) {
    document.getElementById("busan-map").style.display = "none";
  }
  if (document.getElementById("gyeonggi-map")) {
    document.getElementById("gyeonggi-map").style.display = "none";
  }
  if (document.getElementById("gangwon-map")) {
    document.getElementById("gangwon-map").style.display = "none";
  }
  if (document.getElementById("chungbuk-map")) {
    document.getElementById("chungbuk-map").style.display = "none";
  }
  if (document.getElementById("chungnam-map")) {
    document.getElementById("chungnam-map").style.display = "none";
  }
  if (document.getElementById("jeonbuk-map")) {
    document.getElementById("jeonbuk-map").style.display = "none";
  }
  if (document.getElementById("jeonnam-map")) {
    document.getElementById("jeonnam-map").style.display = "none";
  }
  if (document.getElementById("gyeongbuk-map")) {
    document.getElementById("gyeongbuk-map").style.display = "none";
  }
  if (document.getElementById("gyeongnam-map")) {
    document.getElementById("gyeongnam-map").style.display = "none";
  }
  if (document.getElementById("sejong-map")) {
    document.getElementById("sejong-map").style.display = "none";
  }
  if (document.getElementById("jeju-map")) {
    document.getElementById("jeju-map").style.display = "none";
  }

  fetch("../mountainInfos/region/" + regionId + "/" + encodeURI(title))
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
        active: false,
      });
    });

  document.getElementById("mountain-map").src =
    "http://mcjpfbyigjei16837664.cdn.ntruss.com/mountain-map/" +
    photo +
    "?type=m&w=1000&h=1000&ttype=jpg";
}

function back() {
  location.href = "mountain_info.html";
}

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
