const highScoresez = JSON.parse(localStorage.getItem("highScoresez")) || [];
const highScoreshrd = JSON.parse(localStorage.getItem("highScoreshrd")) || [];

const highScoreListez = document.getElementById("list1");
highScoreListez.innerHTML = highScoresez
  .map(score => {
    return `<li class = "highScoresez">${score.name} - ${score.Time} s</li>`;
  })
  .join("")

const highScoreListhrd = document.getElementById("list2");
highScoreListhrd.innerHTML = highScoreshrd
  .map(score => {
    return `<li class = "highScoreshrd">${score.name} - ${score.Time} s</li>`;
  })
  .join("")
