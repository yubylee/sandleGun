const axios = require("axios");
const cheerio = require("cheerio"); // HTML 파싱 라이브러리
const fs = require("fs"); // 파일 시스템 모듈
const path = require("path");
const currentDate = new Date().toLocaleDateString();

const keyword = "등산";
const url = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(
  keyword
)}`;

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
        if (
          news.title === newsList[j].title &&
          news.link === newsList[j].link
        ) {
          isDuplicated = true;
          break;
        }
      }
      if (!isDuplicated) {
        newsList.unshift(news);
      }
    }
    newsList.sort((a, b) => {
      // 최신순으로 정렬
      return new Date(b.date) - new Date(a.date);
    });

    let newsHtml = "";
    for (let i = 0; i < newsList.length; i++) {
      let imgSrc = newsList[i].image2;

      newsHtml += `
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
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <title>SANDLE - 산들산들</title>
    <link rel="stylesheet" href="news.css" />
    <link rel="stylesheet" href="/sandle/index.css" />
    <link rel="icon" href="/sandle/assets/images/profile_default_logo.png" />
  </head>

  <body>
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <title>SANDLE - 산들산들</title>
        <link rel="stylesheet" href="/sandle/index.css" />
        <link rel="icon" href="/sandle/assets/images/default_logo.jpg" />
      </head>

      <body>
        <!-- Header  -->
        <div class="content_navi">
          <div id="header-title">
            <a href="/sandle/index.html">SANDLE</a>

            <nav id="nav">
              <ul>
                <li>
                  <a href="/sandle/index.html">산들 소개</a>
                </li>
                <li>
                  <a href="/sandle/mountain_info/mountain_info.html"
                    >전국 등산로 정보</a
                  >
                </li>
                <li class="current">
                  <a href="#">산악 소식</a>
                  <ul>
                    <ol>
                      산악 소식
                    </ol>
                    <li><a href="/sandle/notice/view.html">공지 사항</a></li>
                    <li><a href="/sandle/news/news.html">산들 뉴스</a></li>
                    <li>
                      <a href="/sandle/festival/festival.html"
                        >지역 행사 정보</a
                      >
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">커뮤니티</a>
                  <ul>
                    <ol>
                      커뮤니티
                    </ol>
                    <li>
                      <a href="/sandle/sandleboard/photofeed.html">포토 피드</a>
                    </li>
                    <li>
                      <a href="/sandle/userPage/userPage.html">마이페이지</a>
                    </li>
                    <li><a href="/sandle/qna/list.html">1:1 문의</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div id="login" class="login">
              <a href="/sandle/auth/login_form.html">LOGIN</a>
            </div>
            <div id="logout" class="logout">
              <a href="sandle/auth/logout" onclick="logout(); return false;">
                LOGOUT</a
              >
            </div>
            <div id="sign-up" class="sign-up">
              <a href="/sandle/member/member.html">SIGN UP</a>
            </div>
            <div id="profilePhoto" class="profilePhoto">
              <a href="/sandle/userPage/userPage.html" id="u-photo-origin">
                <img id="u-photo" class="edit" />
                <span id="userEmail"></span>
              </a>
            </div>
          </div>
        </div>

          <h1 class="keyword">${keyword}<span>${currentDate}</span></h1><br>
          <hr>
          ${newsHtml}

          <!-- Footer -->
        <footer id="footer">
          <div id="footer-title">
            <p>SANDLE</p>
          </div>

          <div id="creater">
            <div id="creater-name-email">
              <h2>creater</h2>
              팀장 : 서영훈 | <a>email : darktemi@nate.com</a><br />
              조원 : 안진수 | <a>email : </a><br />
              조원 : 김종현 | <a>email : </a><br />
              조원 : 이건형 | <a>email : </a><br />
              조원 : 박경한 | <a>email : </a>
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

        <!-- Scripts -->
        <script src="news.js"></script>
        <script src="/sandle/assets/js/jquery.min.js"></script>
        <script src="/sandle/assets/js/jquery.dropotron.min.js"></script>
        <script src="/sandle/assets/js/breakpoints.min.js"></script>
        <script src="/sandle/assets/js/util.js"></script>
        <script src="/sandle/navLogin.js"></script>
      </body>
    </html>
  </body>
</html>
`;

    fs.writeFileSync("news.html", htmlTemplate);
  })
  .catch(function (error) {
    console.log(error);
  });
