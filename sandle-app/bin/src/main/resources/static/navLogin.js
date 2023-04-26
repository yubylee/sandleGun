// nav 바
(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: [null, "736px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Dropdowns.
  $("#nav > ul").dropotron({
    mode: "fade",
    noOpenerFade: true,
    alignment: "center",
  });

  // Nav.

  // Title Bar.
  $(
    '<div id="titleBar">' + '<a href="#navPanel" class="toggle"></a>' + "</div>"
  ).appendTo($body);

  // Panel.
  $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "left",
      target: $body,
      visibleClass: "navPanel-visible",
    });
})(jQuery);

//  로그인 아이콘

fetch("../auth/user")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);

    let member = result.data;

    if (result.status === "success") {
      document.querySelector("#userEmail").innerHTML = result.data.email;
      document.querySelector(".profilePhoto").classList.remove("profilePhoto");
      document.querySelector(".logout").classList.remove("logout");
    } else {
      document.querySelector(".login").classList.remove("login");
      document.querySelector(".sign-up").classList.remove("sign-up");
    }
    if (member.profilePhoto) {
      document.querySelector(
        "#u-photo"
      ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${result.data.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
      document.querySelector(
        "#m-photo"
      ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${result.data.profilePhoto}?type=f&w=300&h=300&faceopt=true&ttype=jpg`;
    } else if (!member.profilePhoto) {
      document.querySelector("#u-photo").src =
        "/sandle/assets/images/default_logo.jpg";
      document.querySelector("#m-photo").src =
        "/sandle/assets/images/default_logo.jpg";
    }
  });

function logout() {
  fetch("../auth/logout")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      location.reload();
    })
    .catch((exception) => {
      console.log(exception);
    });
}

Kakao.init("51570d908ff0ab2abce71614674d7123"); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단
//카카오로그인
function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          console.log(response);

          // location.href = "/sandle/index.html";
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (error) {
      console.log(error);
    },
  });
}
//카카오로그아웃
function kakaoLogout() {
  if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
    Kakao.Auth.setAccessToken(undefined);
  }
}
