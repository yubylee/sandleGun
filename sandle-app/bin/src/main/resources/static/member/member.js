document.querySelector("#btn-insert").onclick = () => {
  const form = document.querySelector("#member-form");
  const formData = new FormData(form);

  let json = JSON.stringify(Object.fromEntries(formData));

  if (
    document.getElementById("m-password").value !=
    document.getElementById("m-password-chk").value
  ) {
    return;
  }
  fetch("../members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        alert("가입 완료!");
        location.href = "/sandle/index.html";
      } else {
        alert("입력 실패!");
        console.log(result.data);
      }
    })
    .catch((exception) => {
      alert("입력 중 오류 발생!");
      console.log(exception);
    });
};

document.querySelector("#btn-cancel").onclick = () => {
  location.href = "/sandle/index.html";
};

/*****************************************************************************주소찾기*********/
function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        // if(extraAddr !== ''){
        //     extraAddr = ' (' + extraAddr + ')';
        // }
        // 조합된 참고항목을 해당 필드에 넣는다.
        // document.getElementById("sample6_extraAddress").value = extraAddr;
      }
      //else {
      //     document.getElementById("sample6_extraAddress").value = '';
      // }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("m-postNo").value = data.zonecode;
      document.getElementById("m-basicAddress").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("m-detailAddress").focus();
    },
  }).open();
}

/****************************************************************************이메일 중복검사**********************************************/
function checkId() {
  if ($("#email").val() == "") {
    $(".id_ok").css("display", "none");
    $(".id_already").css("display", "none");
    $(".id_no").css("display", "none");
  } else {
    var email = $("#email").val();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/; // 이메일 형식 검사
    if (!emailRegex.test(email)) {
      $(".id_already").css("display", "none");
      $(".id_ok").css("display", "none");
      $(".id_no").css("display", "inline-block");
      return;
    } else {
      $.ajax({
        url: "../members/idCheck?email=" + email,
        type: "get", // GET 방식으로 전달
        success: function (cnt) {
          //컨트롤러에서 넘어온 cnt값을 받는다
          if (cnt == 0) {
            //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
            $(".id_ok").css("display", "inline-block");
            $(".id_already").css("display", "none");
            $(".id_no").css("display", "none");
          } else {
            // cnt가 1일 경우 -> 이미 존재하는 아이디
            $(".id_already").css("display", "inline-block");
            $(".id_ok").css("display", "none");
            $(".id_no").css("display", "none");
            alert("아이디를 다시 입력해주세요");
            $("#email").val("");
          }
        },
        error: function () {
          alert("에러입니다");
        },
      });
    }
  }
}
/****************************************************************************닉네임 중복검사**********************************************/
function checkNick() {
  if ($("#nickname").val() == "") {
    $(".ni_ok").css("display", "none");
    $(".ni_already").css("display", "none");
    $(".ni_no").css("display", "none");
  } else {
    var nickname = $("#nickname").val();
    const textRegex = /^[a-zA-Z0-9가-힣]+$/; // 공백 특수문자 검사
    if (!textRegex.test(nickname)) {
      $(".ni_ok").css("display", "none");
      $(".ni_already").css("display", "none");
      $(".ni_no").css("display", "inline-block");
      return;
    } else
      $.ajax({
        url: "../members/nickCheck?nickname=" + nickname,
        type: "get",
        success: function (cnt) {
          if (cnt == 0) {
            $(".ni_ok").css("display", "inline-block");
            $(".ni_already").css("display", "none");
            $(".ni_no").css("display", "none");
          } else {
            $(".ni_ok").css("display", "none");
            $(".ni_already").css("display", "inline-block");
            $(".ni_no").css("display", "none");
          }
        },
        error: function () {
          alert("에러입니다");
        },
      });
  }
}

/******************************전화번호 - 자동*******************************/

// 전화번호 - 없이 입력
const hypenTel = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

/****************************************************************************비번 일치 검사**********************************************/
function check_pw() {
  var pw = document.getElementById("m-password").value;
  var SC = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "?"];
  var check_SC = 0;

  if (pw.length < 6 || pw.length > 16) {
    window.alert("비밀번호는 6글자 이상, 16글자 이하만 이용 가능합니다.");
    document.getElementById("m-password").value = "";
  }
  for (var i = 0; i < SC.length; i++) {
    if (pw.indexOf(SC[i]) != -1) {
      check_SC = 1;
    }
  }
  if (check_SC == 0) {
    window.alert("특수문자가 포함되어 있지 않습니다.");
    document.getElementById("m-password").value = "";
  }
  if (
    document.getElementById("m-password").value != "" &&
    document.getElementById("m-password-chk").value != ""
  ) {
    if (
      document.getElementById("m-password").value ==
      document.getElementById("m-password-chk").value
    ) {
      document.getElementById("check").innerHTML = "비밀번호가 일치합니다.";
      document.getElementById("check").style.color = "#28544b";
    } else {
      document.getElementById("check").innerHTML =
        "비밀번호가 일치하지 않습니다.";
      document.getElementById("check").style.color = "red";
    }
  }
}
