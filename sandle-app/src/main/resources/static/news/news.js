const axios = require("axios");
const cheerio = require("cheerio");// HTML 파싱 라이브러리
const fs = require("fs"); // 파일 시스템 모듈
const path = require("path");
const currentDate = new Date().toLocaleDateString();

const keyword = "등산";
const url = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(keyword)}`;

axios.get('../api/news')
  .then(response => {
    const data = response.data;
    // API 응답 결과(data)를 이용하여 원하는 동작 수행
    console.log(data);
 
    


// 이전에 저장된 뉴스 불러오기
// node를 실행할때마다 이전에 저장된 뉴스 기사들을 유지하면서 새로운 뉴스 기사들만 추가하기 위함
let newsList = [];
try {
  const data = fs.readFileSync("news.json");
  newsList = JSON.parse(data);
  
} catch (err) {
  // 파일이 없는 경우 무시
}

axios
  .get(url)
  .then(function (response) {
    const $ = cheerio.load(response.data);
    // 제목, 내용, 이미지, 링크 정보를 가져와 배열에 저장
    const titleList = $("a.news_tit"); 
    const contentList = $("a.api_txt_lines.dsc_txt_wrap"); 
    const imageList = $("img.thumb.api_get"); //(img.thumb) (.thumb.api_get img) (img.thumb.api_get)
    const linkList = $("a.dsc_thumb");

    for (let i = 0; i < titleList.length; i++) {
      const news = {};
      news.title = $(titleList[i]).text();
      news.content = $(contentList[i]).text();
      news.image2 = $(imageList[i]).attr("data-lazysrc");
      news.link = $(linkList[i]).attr("href");

      // 중복 여부 확인
      let isDuplicated = false;
      for (let j = 0; j < newsList.length; j++) {
        if (news.title === newsList[j].title && news.link === newsList[j].link) {
          
          isDuplicated = true;
          break;
        }
      }
      if (!isDuplicated) {
        newsList.push(news);
      }
    }

    let newsHtml = "";
    for (let i = 0; i < newsList.length; i++) {
      let imgSrc = newsList[i].image2;
      
      // console.log(imgSrc);
      // //이미지 URL이 base64 형식인 경우
      // if (imgSrc.startsWith("data:image/")) {
      //   // base64 디코딩
      //   const base64Data = imgSrc.replace(/^data:image\/gif;base64,/, "");
      //   const imgBuffer = Buffer.from(base64Data, "base64");
      //   // 이미지 파일로 저장
      //   const imgPath = path.join(__dirname, `news_${i}.png`);
      //   fs.writeFileSync(imgPath, imgBuffer);
      //   // URL 형식으로 변경
      //   imgSrc = `file://${imgPath}`;
      // }

      newsHtml +=
        `
      <div class="parent-container">
        <div class="news"> 
          <a href="${newsList[i].link}" target="_blank" class="title">${newsList[i].title}</a>
            <img src="${imgSrc}" alt="news image">
            <div class="content">${newsList[i].content}</div>
        </div>
      </div>

        `;
    }
      // 뉴스 정보를 JSON 파일에 저장
      const jsonData = JSON.stringify(newsList);
      fs.writeFileSync("news.json", jsonData);

      // HTML 파일 생성
      const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>News</title>
          <link rel="stylesheet" href="news.css">
        </head>

        <body>

        <header id="header">
        <h1><a href="index.html">SANDLE</a></h1>
  
        <div id="login" class="login">
          <a href="auth/login_form.html">LOGIN</a>
        </div>
  
        <div>
          <a
            id="logout"
            class="logout"
            href="sandle/auth/logout"
            onclick="logout(); return false;"
          >
            LOGOUT</a
          >
        </div>
  
        <div id="sign-up" class="sign-up">
          <a href="member/member.html">SIGN UP</a>
        </div>
  
        <div id="default_logo" class="default_logo">
          <span id="userEmail"></span>
          <a href="#"><img src="assets/images/default_logo.jpg" /></a>
        </div>
      </header>
  
      <!-- Nav -->
      <nav id="nav">
        <ul>
          <li class="current">
            <a href="index.html">산들 소개</a>
            <ul>
              <ol>
                산들 소개
              </ol>
              <li><a href="#">산들산들을 소개합니다.</a></li>
              <li><a href="#">제작 동기</a></li>
            </ul>
          </li>
  
          <li>
            <a href="./mountain_info/mountain_info.html">전국 등산로 정보</a>
          </li>
  
          <li>
            <a href="#">산악 소식</a>
            <ul>
              <ol>
                산악 소식
              </ol>
              <li><a href="#">공지 사항</a></li>
              <li><a href="#">산들 뉴스</a></li>
              <li><a href="#">지역 행사 정보</a></li>
              <li><a href="#">이벤트</a></li>
            </ul>
          </li>
          <li>
            <a href="#">커뮤니티</a>
            <ul>
              <ol>
                커뮤니티
              </ol>
              <li><a href="#">포토 피드</a></li>
              <li><a href="#">맛집 피드</a></li>
              <li><a href="#">등산 일지</a></li>
              <li><a href="#">1:1 문의</a></li>
            </ul>
          </li>
        </ul>
      </nav>

          <h1 class="keyword">${keyword}<span>${currentDate}</span></h1><hr>
          ${newsHtml}

          <footer id="footer">
          <div id="footer-title">
            <p>SANDLE</p>
          </div>
    
          <div id="creater">
            <div id="creater-name-email">
              <h2>creater</h2>
              팀장:서영훈 | <a>email:darktemi@nate.com</a><br />
              조원:안진수 | <a>email:</a><br />
              조원:김종현 | <a>email:</a><br />
              조원:이건형 | <a>email:</a><br />
              조원:박경한 | <a>email:</a>
            </div>
            <div id="creater-github">
              <a href="#" id="git"></a>
              <a href="#" id="git"></a>
              <a href="#" id="git"></a>
              <a href="#" id="git"></a>
              <a href="#" id="git"></a>
            </div>
          </div>
        </footer>

        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/jquery.dropotron.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/util.js"></script>
        </body>
      </html>`;
      
      fs.writeFileSync("news.html", htmlTemplate);
    })
    .catch(function (error) {
    console.log(error);
    });
    
  })
  .catch(error => {
    // 에러 처리
  });
    
