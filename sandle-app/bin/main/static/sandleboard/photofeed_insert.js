let fileInput = document.getElementById('file-input');
let imageContainer = document.getElementById('image-container');
let imagePlusIcon = document.getElementById('post-photo-icon');
const imageCancelIcon = document.getElementById('cancel-photo-icon');
const plusText = document.getElementById('file-text');
var files = [];
var postImages = [];
var postCurrentIndex = 0;
const form = document.querySelector("#photofeed-form");
const formdata = new FormData(form);

fileInput.addEventListener('change', function () {
  postCurrentIndex = 0;
  imageContainer.innerHTML = '';
  postImages = [];
  for (file of fileInput.files) {
    files.push(file);
    console.log(file);
    }

    const reader = new FileReader();
    let currentIndex = 0; // 현재 처리 중인 파일의 인덱스

    function processImage(files) {
      if (currentIndex >= files.length) {
        // 모든 파일 처리가 완료되면 종료
        return;
      }
    
      const file = files[currentIndex];
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.id = "insert-img"; // 이미지 크기를 조절합니다.
        img.classList.add("hidden");
        postImages.push(img);
        imageContainer.appendChild(img); // 이미지를 담을 요소에 이미지를 추가합니다.
    
        // 선택된 파일이 없을 때 이미지를 초기화합니다.
        if (files.length === 0) {
          imageContainer.innerHTML = ''; // 이미지를 담을 요소를 비웁니다.
          imagePlusIcon.style.display = 'block';
          plusText.style.display = 'block';
        }
        
        // 첫번째 이미지 화면에 보이기
        if (postCurrentIndex === 0) {
          postImages[postCurrentIndex].classList.remove("hidden");
          postImages[postCurrentIndex].classList.add("visible");
        }
    
        // 첫번째 이외의 이미지는 안보이게 설정
        // for (let i = 1; i < postImages.length; i++) {
        //   postImages[i].classList.add("hidden");
        // }
    
        currentIndex++; // 다음 파일을 처리하기 위해 인덱스를 증가시킴
        processImage(files); // 재귀적으로 다음 파일을 처리함
      }
    
      reader.readAsDataURL(file); // 파일 정보 출력
    }
    
    processImage(files); // 파일 리스트를 처리하는 함수를 호출함

  console.log(postImages);
});


document.getElementById("post-next-btn").addEventListener("click", function () {
  postImages[postCurrentIndex].classList.add("hidden");
  postImages[postCurrentIndex].classList.remove("visible");
postCurrentIndex = (postCurrentIndex + 1) % postImages.length;
postImages[postCurrentIndex].classList.add("visible");
postImages[postCurrentIndex].classList.remove("hidden");
console.log(postCurrentIndex);
});


// Prev 버튼 클릭시 이전 이미지 보이도록 설정
document.getElementById("post-prev-btn").addEventListener("click", function () {
  postImages[postCurrentIndex].classList.add("hidden");
  postImages[postCurrentIndex].classList.remove("visible");
postCurrentIndex = (postCurrentIndex - 1 + postImages.length) % postImages.length;
postImages[postCurrentIndex].classList.add("visible");
postImages[postCurrentIndex].classList.remove("hidden");
console.log(postCurrentIndex);
});



imageCancelIcon.addEventListener('click', function() {
  // 현재 보여지고 있는 이미지와 파일을 가져옵니다.
  
  for (const [index, post] of postImages.entries()) {
    if (post.classList.contains("visible")) {
      const currentImage = postImages[index];
      const currentFile = files[index];
      console.log(currentImage);
      currentImage.remove();
      postImages.splice(index, 1);
      for (let i = 0; i < files.length; i++) {
        if (files[i] === currentFile) {
          console.log(files[i]);
          files.splice(i, 1);
          console.log(currentFile);
          break;
        }
      }
    }
  }


  // 현재 이미지가 마지막 이미지이면, 인덱스를 0으로 초기화합니다.
  if (postCurrentIndex === postImages.length) {
    postCurrentIndex = 0;
  }

  // 이미지를 보여주거나, 이미지와 파일이 모두 없으면, 이미지 추가 아이콘을 보여줍니다.
  if (postImages.length > 0) {
    postImages[postCurrentIndex].classList.add("visible");
    postImages[postCurrentIndex].classList.remove("hidden");
  } else {
    imagePlusIcon.style.display = 'block';
    plusText.style.display = 'block';
    postCurrentIndex = -1;
  }
  console.log(files);
});



const postClose = document.querySelector("#insert-x-circle");

const closeModal = function () {
  // 이미지 초기화
  imageContainer.innerHTML = ''; // 이미지를 담을 요소를 비웁니다.
  imagePlusIcon.style.display = 'block';
  plusText.style.display = 'block';

  // postCurrentIndex 초기화
  postCurrentIndex = 0;
 files = [];
 postImages = [];

};
// 모달 닫기 버튼 클릭 시 closeModal() 함수 호출
postClose.addEventListener("click", closeModal);




const btnPost = document.getElementById("btn-post"); // 버튼 요소 가져오기

btnPost.addEventListener("click", (event) => {
  console.log("확인");
  event.preventDefault(); // 기본 이벤트 방지

  const title = document.querySelector("#post-tag").value;
  const content = document.querySelector("#post-write").value;

  const formData = new FormData();

  formData.append("tag", title);
  formData.append("content", content);
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  fetch("../sandleboards/post", {
    method: "POST",
    body: formData
  })
    .then((response) => {
      return response.json(); // 서버에서 새로운 댓글 목록을 가져오기 위해 json 형식으로 변환
    })
    .then((result) => {
      console.log(result);
      if (result.status == "success") {
        alert("성공성공!")
        location.reload();
      } else if (result.errorCode == '401') {
        location.href = '../auth/login_form.html';
      } else {
        alert("입력 실패!");
        console.log(result.data);
      }
    })
    .catch(exception => {
      alert("입력 오류!");
      console.error(exception); // 오류 처리
    });
});