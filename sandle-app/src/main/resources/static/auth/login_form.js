document.querySelector('input[name="email"]').value = getCookie("email");

document.querySelector("#btn-login").onclick = () => {
  // 이메일을 쿠키에 보관
  if (document.querySelector('input[type="checkbox"]:checked') != null) {
    setCookie(
      "email",
      document.querySelector('input[name="email"]').value,
      60 * 60 * 24 * 7
    );
  } else {
    setCookie("email", "", 0);
  }

  const form = document.querySelector("#login-form");
  const formData = new FormData(form);

  fetch("login", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        alert("로그인 success!");
        location.href = "/sandle/index.html";
      } else {
        alert("로그인 실패!");
        document.querySelector('input[name="email"]').value = "";
        document.querySelector('input[name="password"]').value = "";
        location.reload();
      }
    })
    .catch((exception) => {
      alert("로그인 오류!");
      console.log(exception);
      location.reload();
    });
};

function getCookie(cookieName) {
  var cookieValue = null;
  if (document.cookie) {
    var array = document.cookie.split(escape(cookieName) + "=");
    if (array.length >= 2) {
      var arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
}

function setCookie(
  cookieName,
  cookieValue,
  cookieMaxAge,
  cookiePath,
  cookieDomain,
  cookieSecure
) {
  var cookieText =
    encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
  cookieText += cookieMaxAge ? "; max-age=" + cookieMaxAge : "";
  cookieText += cookiePath ? "; path=" + cookiePath : "";
  cookieText += cookieDomain ? "; domain=" + cookieDomain : "";
  cookieText += cookieSecure ? "; secure" : "";
  document.cookie = cookieText;
}

//##################페이스북 로그인#####################

// 페이스북 로그인이 성공한 후 서버에 페이스북 로그인 처리를 요청한다.
function facebookLogin(accessToken) {
  const data = {
    accessToken: accessToken,
  };

  fetch("facebookLogin", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        console.log("페이스북 로그인 성공!");
        location.href = "/sandle/";
      } else {
        alert("페이스북 로그인 실패!");
      }
    })
    .catch((exception) => {
      alert("페이스북 로그인 오류!");
      console.log(exception);
    });
}

// 로그인이 성공했을 때 호출된다.
function checkLoginState() {
  // 페이스북 서버에서 로그인 상태를 가져다 달라고 요청한다.
  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      facebookLogin(response.authResponse.accessToken);
    } else {
      alert("페이스북 로그인 실패!");
    }
  });
}

// 페이스북 자바스크립트 라이브러리를 로딩이 완료됐을 때 호출될 함수를 등록한다.
window.fbAsyncInit = function () {
  FB.init({
    appId: "189892286842843", // 개발자가 facebook developer에 등록한 앱 ID
    cookie: true,
    xfbml: true,
    version: "v16.0",
  });
  //FB.AppEvents.logPageView();
};

console.log("window.fbAsyncInit() 함수를 등록했음!");

// 페이스북 자바스크립트 라이브러리를 가져오는 script 태그 추가
(function (d, s, id) {
  var js,
    fjs = document.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
