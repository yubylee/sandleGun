import festival from './festival.json' assert{ type: "json"};

let data = festival.records;
let currentPage = 0; // 현재 페이지
const pageSize = 10; // 페이지 당 항목 수
const totalItems = data.length; // 전체 항목 수
const totalPages = Math.ceil(totalItems / pageSize); // 전체 페이지 수

function loadNextPage() {
  if (currentPage < totalPages) {
    data.sort((a, b) => {
      const dateA = new Date(a.축제시작일자);
      const dateB = new Date(b.축제시작일자);
      return dateB - dateA;
    }); // 최신일자 기준으로 정렬

    const startIndex = currentPage * pageSize; // 시작 인덱스
    const endIndex = Math.min(startIndex + pageSize, totalItems); // 끝 인덱스

    let str = '';
    for (let i = endIndex - 1; i >= startIndex; i--) {
      const element = data[i];
      const year = Number(element.축제시작일자.split('-')[0]);
      const month = Number(element.축제시작일자.split('-')[1]);
      const day = Number(element.축제시작일자.split('-')[2]);
      if (year === 2023 && month >= 1 && day >= 1) {
        str += '<div class="festival" style="width: 600px; max-width: 100%;">';
        str += '<a class="festi-url" href="' + element.홈페이지주소 + '">' + element.축제명 + '</a>';
        str += '<p>' + element.축제내용 + '</p>';
        str += '<p>축제 시작일: ' + element.축제시작일자 + '</p>';
        str += '<p>축제 종료일: ' + element.축제종료일자 + '</p>';
        str += '</div>';
      }
    }
    const container = document.getElementById('container');
    if (currentPage === 0) {
      container.innerHTML = str;
    }else {
      container.innerHTML += str;
    }
    currentPage++;
  }
}

// 링크 클릭 이벤트 리스너 정의
document.addEventListener('click', function (event) {
  const target = event.target;
  if (target && target.classList.contains('festi-url')) {
    const href = target.getAttribute('href');
    if (!href) {
      event.preventDefault(); // 링크 이동 방지
      alert('홈페이지가 존재하지 않습니다.');
    }
  }
});

// 최초 페이지 로드 시 첫 페이지 결과 출력
loadNextPage();

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', loadNextPage);



// 축제 검색
function search(keyword) {
  const results = [];
  data.forEach((element) => {
    if (element.축제명.includes(keyword) || element.축제내용.includes(keyword)) {
      results.push(element);
    }
  });
  return results;
}

function showSearchResults(results) {
  let str = '';
  results.forEach((element) => {
    str += '<div class="festival" style="width: 600px; max-width: 100%;">';
    str += '<a class="festi-url" href="' + element.홈페이지주소 + '">' + element.축제명 + '</a>';
    str += '<p>' + element.축제내용 + '</p>';
    str += '<p>축제 시작일: ' + element.축제시작일자 + '</p>';
    str += '<p>축제 종료일: ' + element.축제종료일자 + '</p>';
    str += '</div>';
  });
  const container = document.getElementById('container');
  container.innerHTML = str;
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
  const keyword = document.getElementById('search-input').value;
  const results = search(keyword);
  if (results.length === 0) {
    alert('검색 결과가 없습니다.');
    location.reload();
  } else {
    showSearchResults(results);
  }
});

const input = document.querySelector('#search-input');
input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const searchText = input.value;
    const results = search(searchText);
    if (results.length === 0) {
      alert('검색 결과가 없습니다.');
      location.reload();
    } else {
      showSearchResults(results);
    }
  }
});

