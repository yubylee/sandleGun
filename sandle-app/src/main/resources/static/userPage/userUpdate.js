
fetch("../users/view")
.then((response) => {
  return response.json();
})
.then((result) => {
  console.log(result)
  if (result.status == "failure") {
    alert("xxxxxxx");
    return;
  }

  let member = result.data;
  console.log(member);
  document.querySelector("#f-no").value = member.no;
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
  //console.log(json);
  if (
    document.getElementById("m-password").value !=
    document.getElementById("m-password-chk").value
  ) {
    return;
  }
  fetch("../users/" + document.getElementById("f-no").value, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      //"Content-Type": "application/x-www-form-urlencoded"
    },
    //body: formData
    body: json,
    //body: qs
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
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
  
document.getElementById("btn-cancel").onclick = () => {
  location.href='userPage.html';
};

if (document.getElementById('f-no').value !== '') {
  document.querySelector('.b-no').style.display = 'none';
}