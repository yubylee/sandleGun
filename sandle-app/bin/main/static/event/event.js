const axios = require('axios');
const cheerio = require('cheerio');

async function getCulturalFestivals() {
  const url = 'https://www.mcst.go.kr/kor/s_culture/festival/festivalList.jsp?pMenuCD=&pCurrentPage=2&pSearchType=&pSearchWord=&pSeq=&pSido=&pOrder=&pPeriod=&fromDt=&toDt=';
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const festivals = [];
  $('.boardlist01 tbody tr').each((index, element) => {
    const title = $(element).find('.subject > a').text().trim();
    const period = $(element).find('.date').text().trim();
    const location = $(element).find('.area').text().trim();
    festivals.push({ title, period, location });
  });

  return festivals;
}

getCulturalFestivals().then((festivals) => {
  console.log(festivals);
}).catch((error) => {
  console.error(error);
});