getMountainInfos();

$(function () {
  $("#accordion").accordion();
});

$(function () {
  $("#tabs").tabs();
});

function getMountainInfos(keyword) {
  let qs = "";
  if (keyword) {
    qs = `?keyword=${keyword}`;
  }

  fetch("../mountainInfos" + qs)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      // document.querySelector("#arccordion > h3 > input").innerHTML =
      // templateEngine(result.data);
    });
}
