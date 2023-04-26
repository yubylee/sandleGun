const tabButtons = document.querySelectorAll(".tab_button");
const tabUnderline = document.querySelector(".tab_underline");
const arrowButton = document.querySelector(".arrow_1");

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

fetch("auth/user")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);
    if (result.status === "success") {
      document.querySelector("#userEmail").innerHTML = result.data.email;
      document.querySelector(".profilePhoto").classList.remove("profilePhoto");
      document.querySelector(".logout").classList.remove("logout");
    } else {
      document.querySelector(".login").classList.remove("login");
      document.querySelector(".sign-up").classList.remove("sign-up");
    }
    if (result.data.profilePhoto) {
      document.querySelector(
        "#u-photo"
      ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${result.data.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
    } else {
      document.querySelector("#u-photo").src =
        "/sandle/assets/images/default_logo.jpg";
    }
  });

function logout() {
  fetch("auth/logout")
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

arrowButton.addEventListener("click", () => {
  // Scroll to "who-we-are" section
  const section = document.getElementById("who-we-are");
  section.scrollIntoView({ behavior: "smooth" });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("tab_initial"));

    // Add active class to clicked button
    button.classList.add("tab_initial");

    // Move underline to position of clicked button
    const rect = button.getBoundingClientRect();
    const containerRect = button
      .closest(".tab_button_box")
      .getBoundingClientRect();
    tabUnderline.style.width = `${rect.width}px`;
    tabUnderline.style.transform = `translateX(${
      rect.left - containerRect.left
    }px)`;

    // Scroll to section with corresponding ID
    const sectionId = button.getAttribute("data-section-id");
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const currentScrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      currentScrollPosition + windowHeight / 2 >= sectionTop &&
      currentScrollPosition + windowHeight / 2 < sectionBottom
    ) {
      // Highlight corresponding button and move underline
      const button = document.querySelector(
        `.tab_button[data-section-id="${section.id}"]`
      );

      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("tab_initial"));

      // Add active class to corresponding button
      button.classList.add("tab_initial");

      // Move underline to position of corresponding button
      const rect = button.getBoundingClientRect();
      const containerRect = button
        .closest(".tab_button_box")
        .getBoundingClientRect();
      tabUnderline.style.width = `${rect.width}px`;
      tabUnderline.style.transform = `translateX(${
        rect.left - containerRect.left
      }px)`;
    }
  });
});

const img = document.querySelector(".styles_embedVid__3NHjj");
img.addEventListener("click", () => {
  img.style.display = "none";
  const iframe = document.querySelector("iframe");
  iframe.style.display = "block";
});
