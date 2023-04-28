// ----------------------------------------------------------------------------------body
function showImages() {
  var photoDiv = document.getElementById("photo");
  var images = []; // 이미지를 담을 배열
  var currentIndex = 0; // 현재 인덱스

  for (let i = 0; i < sandleboard.attachedFiles.length; i++) {
    const file = sandleboard.attachedFiles[i];
    // console.log(file.photo);
    var img = document.createElement("img");
    img.src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/photofeed/${file.photo}?type=u&w=286&h=351&ttype=jpg`;
    img.id = "attach-img";
    images.push(img); // 배열에 이미지 추가
    photoDiv.appendChild(img);
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

  // Next 버튼 클릭시 다음 이미지 보이도록 설정
  document.getElementById("next-btn").addEventListener("click", function () {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = "block";
  });

  // Prev 버튼 클릭시 이전 이미지 보이도록 설정
  document.getElementById("prev-btn").addEventListener("click", function () {
    images[currentIndex].style.display = "none";
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].style.display = "block";
  });
};

const $btnCloseInsert = $("#insert-x-circle");
const $btnInsert = $("#board-plus");
const $modal_insert = $(".modal-insert");
const $olderPhoto = $("#photo");

const $btnClosePopup = $("#x-circle");
$btnClosePopup.on("click", function () {
  $modal.css("display", "none");
  $body.css("overflow", "auto");
  $olderPhoto.css("display", "block");
  $olderPhoto.empty();

  images = [];
  currentIndex = 0;
});




const $modal = $(".modal");
const $viewContainer = $(".view-con");
const cmt = document.querySelector("#comment");
const $body = $("body");
const html = document.querySelector("#image-template").innerHTML;
const templateEngine = Handlebars.compile(html);
let container = document.querySelector(".container");
const loadData = (event) => {
  fetch("../sandleboards")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const images = result.data.reverse();
      console.log(result.data);
      const dividedImages = divideArray(images, 9); // 9개씩 자르기
      let currentPage = 0;
      console.log(dividedImages);

      //스크롤 이벤트 핸들러
      window.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          currentPage++;
          if (currentPage < dividedImages.length) {
            container.innerHTML += templateEngine(dividedImages[currentPage]);
          }
        }
      });

      // 초기 데이터 로드
      container.innerHTML = templateEngine(dividedImages[0]);
    });
};

// 배열을 n개씩 나누는 함수
const divideArray = (arr, n) => {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
};


loadData();

// 게시글 눌렀을시 게시글 View

let no;
let sandleboard;
let isLike = false;
function getSandleBoard(e) {
  no = e.currentTarget.getAttribute("data-no");
  document.querySelector(".modal").setAttribute("data-board-no", no);
  fetch("../sandleboards/" + no)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result.data);
      if (result.status == "failure") {
        alert("게시글을 조회할 수 없습니다.");
        location.href = "photofeed.html";
        return;
      }
      console.log(result.data);
      let sandleLoginUser = result.data.loginUser;

      var img = document.createElement("img");
      sandleboard = result.data.board;
      document.querySelector("#content").innerHTML = sandleboard.content;
      document.querySelector("#tag").innerHTML = sandleboard.tag;
      document.querySelector("#user-info-id").innerHTML = sandleboard.nickname;
      document.querySelector("#board-date").innerHTML = sandleboard.createdDate;
      document.querySelector(".view-count").innerHTML = sandleboard.viewCount;
      console.log(sandleboard.createdDate);
      if (sandleboard.profilePhoto == null) {
        document.querySelector("#modal-user-image").src =
          "../assets/images/profile_default_logo.png";
      } else {
        document.querySelector(
          "#modal-user-image"
        ).src = `http://mcjpfbyigjei16837664.cdn.ntruss.com/profile-photo/${sandleboard.profilePhoto}?type=f&w=40&h=40&faceopt=true&ttype=jpg`;
      }

      console.log(sandleboard);
      showImages();


      // --------------------------------좋아요 아주
  
      fetch("../likes/" + no)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result.data);
        if(result.data == "disLike") {
          likeIcon.classList.remove('active');
          isLike = false;
          likeStatus = result.data;
        } else {
          likeIcon.classList.add('active');
          isLike = true;
        }
        console.log(isLike);
      });



      likeReload(no);

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
      $viewContainer.css("overflow", "hidden");

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
//라이크 카운터 리로드
function likeReload(no) {
  fetch("../likes/" + no + "/count/")
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log("총 좋아요 숫자 : " + result.data);
    // likeCount = result.data;
    document.querySelector(".like-count").innerHTML = result.data;
  });
}

const likeButton = document.querySelector(".like-button");
const likeIcon = likeButton.querySelector(".like-icon");

likeButton.addEventListener('click', function() {
  const no = document.querySelector(".modal").getAttribute("data-board-no");
  switch(isLike) {
    case false:
      const formData = new FormData();
      formData.append("boardNo", no);
      let json = JSON.stringify(Object.fromEntries(formData));
      fetch("../likes", {
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
            likeIcon.classList.add('active');
            isLike = true;
            likeReload(no);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("좋아요 실패했습니다.");
        });


      break;
    case true:

      console.log(isLike);
      fetch("../likes/" + no, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.status == "success") {
            console.log(result.data);
            likeIcon.classList.remove('active');
            isLike = false;
            likeReload(no);
          }
        })
        .catch((exception) => {
          // alert("삭제 중 오류 발생!");
          console.log(exception);
        });
      break;
    default:
      console.log("isLike 값이 유효하지 않습니다.");
      break;
  }

  
});




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
          // alert("삭제 중 오류 발생!");
          console.log(exception);
        });
    });
  });
}

$btnCloseInsert.on("click", function () {
  $modal_insert.css("display", "none");
  $body.css("overflow", "auto");
});

$btnInsert.on("click", function () {
  $modal_insert.css("display", "block");
  $body.css("overflow", "hidden");
});


$(document).keydown(function(event) {
  if(event.keyCode == 27 || event.which == 27) {
    $modal.css("display", "none");
    $body.css("overflow", "auto");
    $olderPhoto.css("display", "block");



    $olderPhoto.empty();
  
    images = [];
    currentIndex = 0;
  }
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
        reloadComments(); // 댓글 목록을 서버에서 다시 불러와 화면을 업데이트합니다.
      }
    })
    .catch((exception) => {
      // alert("삭제 중 오류 발생!");
      console.log(exception);
    });
}

document.querySecirclelectorAll(".cmt-x-logo").forEach(function (element) {
  element.addEventListener("click", function () {
    const replyNo = element.getAttribute("name");
    deleteComment(replyNo);
  });
});


