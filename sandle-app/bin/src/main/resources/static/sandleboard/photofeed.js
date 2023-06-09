// ----------------------------------------------------------------------------------body

const $modal = $(".modal");
const cmt = document.querySelector("#comment");
const $body = $("body");
const html = document.querySelector("#image-template").innerHTML;
const templateEngine = Handlebars.compile(html);

const container = document.querySelector(".container");
const loadData = () => {
  fetch("../sandleboards")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result.data);
      const images = result.data.reverse();
      container.innerHTML += templateEngine(images);
    });
};

// 무한 스크롤
let isLoading = false;
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
    isLoading = true;
    loadData();
    isLoading = false;
  }
});

loadData();

// 게시글 눌렀을시 게시글 View
let no;
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
      let sandleboard = result.data.board;
      document.querySelector("#content").innerHTML = sandleboard.content;
      document.querySelector("#tag").innerHTML = sandleboard.tag;
      document.querySelector("#user-info-id").innerHTML = sandleboard.nickname;
      if (sandleboard.profilePhoto == null) {
        document.querySelector("#modal-user-image").src =
          "../assets/images/profile_default_logo.png";
      } else {
        document.querySelector(
          "#modal-user-image"
        ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${sandleboard.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
      }

      console.log(sandleboard);
      var photoDiv = document.getElementById("photo");
      photoDiv.style.backgroundImage = `url(http://mcjpfbyigjei16837664.cdn.ntruss.com/photofeed/${sandleboard.fileName}?type=u&w=286&h=351&ttype=jpg)`;
      photoDiv.style.backgroundSize = "cover";
      photoDiv.style.backgroundPosition = "center";
      photoDiv.style.backgroundRepeat = "no-repeat";
      photoDiv.appendChild(img);
      // --------------------------------좋아요 아주
      const likeButton = document.querySelector(".like-button");
      const likeCount = likeButton.querySelector(".like-count");
      const likeIcon = likeButton.querySelector(".like-icon");

      let isLiked = false;
      let count = 0;

      likeButton.addEventListener("click", function () {
        isLiked = !isLiked;
        count += isLiked ? 1 : -1;

        likeCount.textContent = count;
        likeIcon.classList.toggle("active", isLiked);
      });

      let div = "";
      sandleboard.comments.forEach((comment) => {
        if (comment.no == 0) return;
        let html =
          `
        <div id="cmt-box">
        <div  style="display: flex; align-items: center;"> ` +
          (comment.profilePhoto == null
            ? `<img src="../assets/images/default_logo.jpg" 
      id="cmt-image"
      style="border-radius:30px;"/>`
            : `<img src="http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${comment.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg" 
        id="cmt-image"
        style="border-radius:30px;"/>`) +
          `<span id="cmt-nickname">${comment.nickname}</span><br/>` +
          (result.data.loginUser.no === comment.writerNo
            ? `<img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>`
            : "") +
          `</div>
        <div id="cmt-content">${comment.commentContent}</div>
        </div>
        `;
        div += html;
        console.log(comment);
      });
      document.querySelector("#comment").innerHTML = div;
      // 스크롤 내리기
      // cmt.scrollTo(0, document.body.scrollHeight);
      cmt.scrollTop = cmt.scrollHeight;
      $modal.css("display", "block");
      $body.css("overflow", "hidden");

      //삭제버튼 클릭 리스너--------------------------------------------------------
      document.querySelectorAll(".cmt-x-logo").forEach(function (element) {
        element.addEventListener("click", function () {
          const replyNo = element.getAttribute("name");
          fetch("../sandleboards/" + replyNo, {
            method: "DELETE",
          })
            .then((response) => {
              return response.json();
            })
            .then((result) => {
              if (result.status == "success") {
                console.log(result.data);
                // 삭제된 댓글을 바로 HTML에서 제거합니다.
                // let commentBox = document.querySelector(`[name="${replyNo}"]`).parentNode.parentNode;
                // commentBox.parentNode.removeChild(commentBox);
              }
            })
            .catch((exception) => {
              // alert("삭제 중 오류 발생!");
              console.log(exception);
            });
        });
      });

      // 이벤트 위임 기법을 사용하여 이벤트 핸들러를 등록합니다.
      document.addEventListener("click", function (event) {
        // 클릭된 요소가 ".cmt-x-logo" 클래스를 가지고 있는지 확인합니다.
        if (event.target.classList.contains("cmt-x-logo")) {
          // 클릭된 요소가 ".cmt-x-logo" 클래스를 가진 경우, 이벤트를 처리합니다.
          const replyNo = event.target.getAttribute("name");
          deleteComment(replyNo);
          reloadComments();
        }
      });
    });
}

// --댓글 인서트
function submitComment() {
  const inputField = document.getElementById("comment-insert");
  const content = inputField.value;
  const formData = new FormData();
  formData.append("content", content);
  formData.append("boardNo", no);

  // --로그인유정정보 가져오기
  fetch("../auth/userlogin")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("로그인하세영");
        location.href = "../auth/login_form.html";
      }
      console.log(result);
      inputComment();
      // 입력 필드 비우기
      inputField.value = "";
    });

  console.log(inputField.value);

  fetch("../sandleboards", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json(); // 서버에서 새로운 댓글 목록을 가져오기 위해 json 형식으로 변환
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("댓글 등록에 실패했습니다.");
    });
}

const inputField = document.getElementById("comment-insert");
const submitButton = document.getElementById("comment-insert-button");

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitComment();
  }
});

submitButton.addEventListener("click", function () {
  submitComment();
});

// 삭젝랑 댓글 추가 함수
function inputComment() {
  reloadComments(); // 서버에서 새로운 댓글 목록을 가져와서 화면을 업데이트

  document.querySelectorAll(".cmt-x-logo").forEach(function (element) {
    element.addEventListener("click", function () {
      const replyNo = element.getAttribute("name");
      deleteComment(replyNo);
      reloadComments();
    });
  });

  // document.querySelector("#comment").innerHTML += html;

  let deleteButtons = document.querySelectorAll(".cmt-x-logo");

  deleteButtons.forEach(function (element) {
    element.addEventListener("click", function () {
      const replyNo = element.getAttribute("name");
      console.log(replyNo);
      fetch("../sandleboards/" + replyNo, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.status == "success") {
            reloadComments();
            console.log(result.data);
            // 삭제된 댓글을 바로 HTML에서 제거합니다.
            // let commentBox = document.querySelector(`[name="${replyNo}"]`).parentNode.parentNode;
            // commentBox.parentNode.removeChild(commentBox);
          }
        })
        .catch((exception) => {
          alert("삭제 중 오류 발생!");
          console.log(exception);
        });
    });
  });
}

const $btnClosePopup = $("#x-circle");
const $btnCloseInsert = $("#insert-x-circle");
const $btnInsert = $("#board-plus");
const $modal_insert = $(".modal-insert");
const $olderPhoto = $("#photo");

$btnClosePopup.on("click", function () {
  $modal.css("display", "none");
  $body.css("overflow", "auto");
  $olderPhoto.css("display", "block");
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

function addComment(comment) {
  let html = `
    <div id="cmt-box">
      <div style="display: flex; align-items: center;">
        <img src="http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${comment.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg"/><span id="cmt-nickname">${comment.nickname}</span><br/>
        <img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>
      </div>
      <div id="cmt-content">${comment.commentContent}</div>
    </div>
  `;
  document.querySelector("#comment").innerHTML += html;
}

function reloadComments() {
  fetch("../sandleboards/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "failure") {
        alert("게시글을 조회할 수 없습니다.");
        location.href = "photofeed.html";
        return;
      }

      let sandleLoginUser = result.data.loginUser;
      let sandleboard = result.data.board;

      let div = "";
      sandleboard.comments.forEach((comment) => {
        if (comment.no == 0) return;
        let html =
          `
          <div id="cmt-box">
            <div style="display: flex; align-items: center;">
            ` +
          (comment.profilePhoto == null
            ? `<img src="../assets/images/default_logo.jpg" 
           id="cmt-image"
           style="border-radius:30px;"/>`
            : `<img src="http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${comment.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg" 
             id="cmt-image"
             style="border-radius:30px;"/>`) +
          `<span id="cmt-nickname">${comment.nickname}</span><br/>
              ${
                sandleLoginUser.no === comment.writerNo
                  ? `<img src="../assets/photofeed_images/comment-x-icon.png" class="cmt-x-logo" name="${comment.no}"/>`
                  : ""
              }
            </div>
            <div id="cmt-content">${comment.commentContent}</div>
          </div>
        `;
        div += html;
      });
      document.querySelector("#comment").innerHTML = div;
      document.querySelector("#comment").scrollTop = 0;
    });
}

function deleteComment(replyNo) {
  fetch("../sandleboards/" + replyNo, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.status == "success") {
        console.log(result.data);
        // 삭제된 댓글을 바로 HTML에서 제거합니다.
        // let commentBox = document.querySelector(`[name="${replyNo}"]`).parentNode.parentNode;
        // commentBox.parentNode.removeChild(commentBox);
        reloadComments(); // 댓글 목록을 서버에서 다시 불러와 화면을 업데이트합니다.
      }
    })
    .catch((exception) => {
      alert("삭제 중 오류 발생!");
      console.log(exception);
    });
}

document.querySecirclelectorAll(".cmt-x-logo").forEach(function (element) {
  element.addEventListener("click", function () {
    const replyNo = element.getAttribute("name");
    deleteComment(replyNo);
  });
});

const fileInput = document.getElementById("file-input");
const selectedImage = document.getElementById("selected-image");
const imagePlusIcon = document.getElementById("post-photo-icon");
const plusText = document.getElementById("file-text");
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    selectedImage.src = URL.createObjectURL(file);
    selectedImage.style.display = "block";
    imagePlusIcon.style.display = "none";
    plusText.style.display = "none";

    // 파일 정보 출력
    console.log(file);
  };
  reader.readAsDataURL(file);
});

const postClose = document.querySelector("#insert-x-circle");

const closeModal = function () {
  // 이미지 초기화
  selectedImage.src = "";
  selectedImage.style.display = "none";
  imagePlusIcon.style.display = "block";
  plusText.style.display = "block";
};

// 모달 닫기 버튼 클릭 시 closeModal() 함수 호출
postClose.addEventListener("click", closeModal);

const btnPost = document.getElementById("btn-post"); // 버튼 요소 가져오기

btnPost.addEventListener("click", (event) => {
  event.preventDefault(); // 기본 이벤트 방지
  const form = document.querySelector("#photofeed-form");
  const formData = new FormData(form);
  console.log("확인");

  fetch("../sandleboards/post", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json(); // 서버에서 새로운 댓글 목록을 가져오기 위해 json 형식으로 변환
    })
    .then((result) => {
      console.log(result);
      if (result.status == "success") {
        alert("성공성공!");
        location.reload();
      } else if (result.errorCode == "401") {
        location.href = "../auth/login_form.html";
      } else {
        alert("입력 실패!");
        console.log(result.data);
      }
    })
    .catch((exception) => {
      alert("입력 오류!");
      console.error(exception); // 오류 처리
    });
});

// -----------------------좋아요 아주 좋아요----------------------
