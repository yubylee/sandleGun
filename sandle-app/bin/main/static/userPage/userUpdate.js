fetch("../users/view")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);
    if (result.status == "failure") {
      alert("회원을 조회할 수 없습니다.");
      location.href = "/sandle/auth/login_form.html";
    }

    let member = result.data;
    console.log(member);
    document.querySelector("#f-no").value = member.no;
    document.querySelector("#f-profilePhoto").value = member.profilePhoto;
    document.querySelector("#email").value = member.email;
    document.querySelector("#m-name").value = member.name;
    document.querySelector("#nickname").value = member.nickname;
    document.querySelector("#m-tel").value = member.tel;
    document.querySelector("#m-postNo").value = member.postNo;
    document.querySelector("#m-basicAddress").value = member.basicAddress;
    document.querySelector("#m-detailAddress").value = member.detailAddress;
    document.querySelector("#m-birth").value = member.birth;
  });

document.getElementById("btn-update").onclick = () => {
  const form = document.querySelector("#member-form");
  const formData = new FormData(form);

  let json = JSON.stringify(Object.fromEntries(formData));
  if (
    document.getElementById("m-password").value !=
      document.getElementById("m-password-chk").value ||
    document.getElementById("m-password").value == ""
  ) {
    alert("비밀번호가 같지 않거나 다릅니다.");
    return;
  }
  fetch("../users/" + document.getElementById("f-no").value, {
    method: "PUT",
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
        alert("변경 했습니다.");
        location.reload();
      } else {
        alert("변경 실패!");
        console.log(result.data);
      }
    })
    .catch((exception) => {
      alert("변경 중 오류 발생!");
      console.log(exception);
    });
};

/******************************주소찾기*******************************/
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

/******************************닉네임 검사*******************************/
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
        url: "../users/nickCheck?nickname=" + nickname,
        type: "get",
        success: function (cnt) {
          console.log(cnt);
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

/******************************비밀번호 검사*******************************/

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

/******************************전화번호 - 자동*******************************/

const hypenTel = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

document.getElementById("btn-cancel").onclick = () => {
  location.href = "userPage.html";
};
