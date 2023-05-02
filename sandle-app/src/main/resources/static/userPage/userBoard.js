/*
  Dopetrope by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

const photoDiv = document.getElementById("photo");
var images = []; // 이미지를 담을 배열
var currentIndex = 0; // 현재 인덱스
function showImages() {
  currentIndex = 0;
  photoDiv.innerHTML = '';
  images = [];

  for (let i = 0; i < sandleboard.attachedFiles.length; i++) {
    const file = sandleboard.attachedFiles[i];
    console.log(file.photoNo);
    var imgContainer = document.createElement("div"); // 이미지와 x 버튼을 담을 div 요소 생성
    var img = document.createElement("img");
    img.src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/photofeed/${file.photo}?type=u&w=286&h=351&ttype=jpg`;
    img.id = "attach-img";
    img.setAttribute('name', file.photoNo); // img에 file.photoNo를 name 속성으로 추가


    imgContainer.appendChild(img); // 이미지와 x 버튼을 div 요소에 추가
    images.push(imgContainer); // 배열에 div 요소 추가
    photoDiv.appendChild(imgContainer); // div 요소를 화면에 추가
  }

  photoDiv.style.backgroundSize = "cover";
  photoDiv.style.backgroundPosition = "center";
  photoDiv.style.backgroundRepeat = "no-repeat";

  // 첫번째 이미지 화면에 보이기
  images[currentIndex].style.display = "block";

  // 첫번째 이외의 이미지는 안보이게 설정
  for (let i = 1; i < images.length; i++) {
    images[i].style.display = "none";
  }

  
};
document.getElementById("next-btn").addEventListener("click", function () {
  if (images.length === 0) {
    return;
  }

  images[currentIndex].style.display = "none";
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.display = "block";
});

document.getElementById("prev-btn").addEventListener("click", function () {
  if (images.length === 0) {
    return;
  }

  images[currentIndex].style.display = "none";
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  images[currentIndex].style.display = "block";
});

// ---------------------------------------------------

// ----------------------------------------------------------------------------------body

const $modal = $(".modal");
const cmt = document.querySelector("#comment");
const $body = $("body");
const html = document.querySelector("#image-template").innerHTML;
const templateEngine = Handlebars.compile(html);

const container = document.querySelector(".container");
const loadData = () => {
  fetch("../sandleboards/userBoard")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result.data);
      const images = result.data.reverse();
      container.innerHTML += templateEngine(images);
    });
};


loadData();

// 게시글 눌렀을시 게시글 View
let no;
let sandleboard;
function getSandleBoard(e) {
  no = e.currentTarget.getAttribute("data-no");
  fetch("../sandleboards/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result.data);
      if (result.status == "failure") {

        alert("게시글을 조회할 수 없습니다.");
        location.href = "photofeed.html";
        return;
      }
      console.log(result.data);
      let sandleLoginUser = result.data.loginUser;

      var img = document.createElement("img");
      sandleboard = result.data.board;
      document.querySelector("#content").value = sandleboard.content;
      document.querySelector("#tag").value = sandleboard.tag;
      document.querySelector("#user-info-id").innerHTML = sandleboard.nickname;

      if (sandleboard.profilePhoto == null) {
        document.querySelector(
          "#modal-user-image"
        ).src = "../assets/images/profile_default_logo.png";
      } else {
        document.querySelector(
          "#modal-user-image"
        ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${sandleboard.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
      }


      console.log(sandleboard);
      showImages()

      const photo = document.querySelector('#photo');
      const new_photo = document.querySelector('#seleted-image');
      editIcon.style.display = 'none';
      photo.addEventListener('mouseenter', function () {
        editIcon.style.display = 'block';
      });
      editIcon.addEventListener('mouseenter', function () {
        editIcon.style.display = 'block';
      });

      photo.addEventListener('mouseleave', function () {
        editIcon.style.display = 'none';
      });
      $modal.css("display", "block");
      $body.css("overflow", "hidden");
    })
    
  }

  document.querySelector('#edit-board').onclick = function () {

    const form = document.querySelector('#edit-form');
    const formData = new FormData(form);

    fetch("../sandleboards/" + no + "/update/", {
      method: "PUT",
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.status == 'success') {
          location.reload();
        } else {
          alert('변경 실패!');
        }
      })
      .catch(exception => {
        // alert('변경 중 오류 발생!');
        console.log(exception);
      });

  }


document.querySelector('#delete-board').onclick = function () {
  fetch("../sandleboards/" + no + "/userBoard/", {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.status == "success") {
        alert("성공성공!");
        location.reload();
        console.log(result.data);
      } else {
        
      }
    })
    .catch((exception) => {

      console.log(exception);
    });
};




const $btnClosePopup = $("#x-circle");
const $btnCloseInsert = $("#insert-x-circle");
const $btnInsert = $("#board-plus");
const $modal_insert = $(".modal-insert");
const $selected_image = $("#selected-image");

$btnClosePopup.on("click", function () {
  $modal.css("display", "none");
  $body.css("overflow", "auto");
  $selected_image.css("display", "none");
  $("#photo").empty();
});

$btnCloseInsert.on("click", function () {
  $modal_insert.css("display", "none");
  $body.css("overflow", "auto");
});

$btnInsert.on("click", function () {
  $modal_insert.css("display", "block");
  $body.css("overflow", "hidden");
});

$("#sandle").on("click", function () {
  location.href = "../index.html";
});




const oldPhoto = document.querySelector('#photo');
const fileInput = document.getElementById('file-input');
const selectedImage = document.getElementById('selected-image');
const imagePlusIcon = document.getElementById('post-photo-icon');
const plusText = document.getElementById('file-text');
const editIcon = document.querySelector('#edit-photo-icon');
// const editIcon = document.querySelector('#edit-photo-icon');
fileInput.addEventListener('change', function () {
  for (file of fileInput.files) {
    console.log(file);

    var imgContainer = document.createElement("div"); // 이미지와 x 버튼을 담을 div 요소 생성
    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.id = "attach-img";
    img.setAttribute('name', "temp"); // img에 file.photoNo를 name 속성으로 추가
    imgContainer.style.display = "none"

    imgContainer.appendChild(img); // 이미지와 x 버튼을 div 요소에 추가
    images.push(imgContainer); // 배열에 div 요소 추가
    photoDiv.appendChild(imgContainer); // div 요소를 화면에 추가




  }

  // const reader = new FileReader();
  // reader.onload = function (e) {
  //   // selectedImage.src = URL.createObjectURL(file);
  //   // selectedImage.style.display = 'block';
  //   // editIcon.style.display = 'block';
  //   // oldPhoto.style.display = 'block';

  //   // 파일 정보 출력
  //   console.log(file);
  // }
  // reader.readAsDataURL(file);

});


const postClose = document.querySelector("#x-circle");

const closeModal = function () {
  // 이미지 초기화
  selectedImage.src = "";
  selectedImage.style.display = "none";
  oldPhoto.style.display = "block";
  plusText.style.display = 'block';
};

// 모달 닫기 버튼 클릭 시 closeModal() 함수 호출
postClose.addEventListener("click", closeModal);

