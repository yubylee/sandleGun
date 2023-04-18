var openModalBtn = document.querySelector(".change-profile-photo-btn");
var modal = document.querySelector(".modal");

openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// 모달창 닫기
document
  .querySelector(".close-modal-btn")
  .addEventListener("click", () => (modal.style.display = "none"));

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
