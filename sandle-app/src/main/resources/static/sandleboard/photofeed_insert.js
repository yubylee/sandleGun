const fileInput = document.getElementById('file-input');
let imageContainer = document.getElementById('image-container');
const imagePlusIcon = document.getElementById('post-photo-icon');
const plusText = document.getElementById('file-text');
fileInput.addEventListener('change', function () {
  var postCurrentIndex = 0;
  var postImages = [];
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.id = "insert-img" // 이미지 크기를 조절합니다.
      postImages.push(img);
      imageContainer.appendChild(img); // 이미지를 담을 요소에 이미지를 추가합니다.
      
      // 선택된 파일이 없을 때 이미지를 초기화합니다.
      if (files.length === 0) {
        imageContainer.innerHTML = ''; // 이미지를 담을 요소를 비웁니다.
        imagePlusIcon.style.display = 'block';
        plusText.style.display = 'block';
      }
      
      // 첫번째 이미지 화면에 보이기
      if (postImages.length > 0) {
        postImages[postCurrentIndex].style.display = "block";
      }

      // 첫번째 이외의 이미지는 안보이게 설정
      for (let i = 1; i < postImages.length; i++) {
        postImages[i].style.display = "none";
      }

      
      
    }
    // Next 버튼 클릭시 다음 이미지 보이도록 설정
    reader.readAsDataURL(file);
    
    // 파일 정보 출력
    imagePlusIcon.style.display = 'none';
    plusText.style.display = 'none';
  }
  document.getElementById("post-next-btn").addEventListener("click", function () {
    console.log("하하하");
  postImages[postCurrentIndex].style.display = "none";
  postCurrentIndex = (postCurrentIndex + 1) % postImages.length;
  postImages[postCurrentIndex].style.display = "block";
  });
  
  // Prev 버튼 클릭시 이전 이미지 보이도록 설정
  document.getElementById("post-prev-btn").addEventListener("click", function () {
    console.log("캬캬캬");
  postImages[postCurrentIndex].style.display = "none";
  postCurrentIndex = (postCurrentIndex - 1 + postImages.length) % postImages.length;
  postImages[postCurrentIndex].style.display = "block";
  });
});



const postClose = document.querySelector("#insert-x-circle");

const closeModal = function () {
  // 이미지 초기화
  while (imageContainer.firstChild) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
  imagePlusIcon.style.display = 'block';
  plusText.style.display = 'block';
};


// 모달 닫기 버튼 클릭 시 closeModal() 함수 호출
postClose.addEventListener("click", closeModal);




const btnPost = document.getElementById("btn-post"); // 버튼 요소 가져오기

btnPost.addEventListener("click", (event) => {
  console.log("확인");
  event.preventDefault(); // 기본 이벤트 방지
  const form = document.querySelector("#photofeed-form");
  const formData = new FormData(form);

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