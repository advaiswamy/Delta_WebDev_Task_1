const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const highScoreList = document.getElementById("list");
highScoreList.innerHTML = highScores
  .map(score => {
    return `<li class = "highScores">${score.name} - ${score.Time} s</li>`;
  })
  .join("")
