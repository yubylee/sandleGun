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
      document.querySelector(".default_logo").classList.remove("default_logo");
      document.querySelector(".logout").classList.remove("logout");
    } else {
      document.querySelector(".login").classList.remove("login");
      document.querySelector(".sign-up").classList.remove("sign-up");
    }
    if (member.profilePhoto != null) {
      if (!document.querySelector("#m-photo-origin")) {
        return;
      }
      document.querySelector(
        "#m-photo-origin"
      ).href = `https://kr.object.ncloudstorage.com/sandle-images/profile-photo/${member.profilePhoto}`;
      document.querySelector(
        "#m-photo"
      ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${member.profilePhoto}?type=f&w=200&h=200&faceopt=true&ttype=jpg`;
    } else if (member.profilePhoto == null) {
      if (!document.querySelector("#m-photo")) {
        return;
      }
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
