document.querySelector(".change-profile-photo-btn").onclick = () => {
  fetch("../users/view")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("회원을 조회할 수 없습니다.");
        location.href = "/sandle/auth/login_form.html";
      }

      let member = result.data;
      console.log(member);
      document.querySelector("#f-no").value = member.no;
      if (member.profilePhoto != null) {
        document.querySelector(
          "#p-photo"
        ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${member.profilePhoto}?type=f&w=300&h=300&faceopt=true&ttype=jpg`;
      } else {
        document.querySelector("#p-photo").src =
          "/sandle/assets/images/default_logo.jpg";
      }
    });
};

document.querySelector("#btn-profile").onclick = () => {
  const form = document.querySelector("#member-form");
  const formData = new FormData(form);

  fetch("../members/" + document.querySelector("#f-no").value, {
    method: "PUT",
    body: formData,
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

const fileInput = document.getElementById("profile-photo");
const defaultImage = document.getElementById("p-photo");
const selectedImage = document.getElementById("selected-image");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    selectedImage.src = URL.createObjectURL(file);
    selectedImage.style.display = "block";
    defaultImage.style.display = "none";
    console.log(file);
  };
  reader.readAsDataURL(file);
});
