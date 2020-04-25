//Difficulty
document.getElementById("Noobie").checked = true; //Setting the default selected value
var select = 1;

document.getElementById("Noobie").addEventListener("click", function() {
  select = 1;
  if (highScoresez[0].Time != 'undefined') {
    document.querySelector(".best-time").innerHTML = highScoresez[0].Time;
  }
});

document.getElementById("Hacker").addEventListener("click", function() {
  select = 2;
  if (highScoreshrd[0].Time != 'undefined') {
    document.querySelector(".best-time").innerHTML = highScoreshrd[0].Time;
  }
});


//Timer
var stop = "";

function timer(start) {
  var end = (new Date).getTime();
  var delta = (end - start) / 1000;
  delta.toFixed(3);
  document.querySelector(".dyna").innerHTML = delta;
  stop = setTimeout(function() {
    timer(start)
  }, 30);
}


//Countdown
var count = 3;

function countdown() {
  if (count > 0) {
    document.querySelector(".Start").classList.add("Start2");
    document.querySelector(".Start").innerHTML = count;
    count--;
    setTimeout(countdown, 1000);
  } else {
    var start = (new Date).getTime();
    document.querySelector(".Start").remove();
    const box = document.querySelectorAll(".box");
    setDiv();
    box.forEach(boxs => boxs.style.opacity = 100);
    timer(start);
    let crash = new Audio('sounds/crash.mp3');
    crash.play();
  }
}



// Start Button
document.querySelector(".Start").addEventListener("click", function() {
  clearTimeout(stop);
  document.querySelectorAll(".radiobtn").forEach(radio => {
    radio.disabled = true;
  })
  countdown();
});


//Restart button
document.querySelector("#restart").addEventListener("click", function() {
  location.reload();
});


// Generates a random array with the next 20 numbers including  min
function randGen(min) {
  var arr = [];
  while (arr.length < 20) {
    var r = Math.floor(Math.random() * 20) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

//Creates button
function btnGen(num,cls)
{
  arrx = randGen(num);
  document.querySelectorAll(".box").forEach(box => {
    var btn = document.createElement("div");
    btn.className = cls;
    btn.innerHTML = arrx[0];
    var colorbtn = 40 - arrx[0];
    btn.style.backgroundColor = "rgb("+colorbtn+","+colorbtn+","+colorbtn+")";
    btn.addEventListener("click", change);
    arrx.shift();
    box.appendChild(btn);
  });
}
// Sets the text of the divs in random order
function setDiv() {
  btnGen(1,"button btn");

  if (select > 1) {
    btnGen(21,"button btn2");
  }
}


//Event Listner
var prevbutton = 0;
var end = 20;

function change() {
  if (select > 1) {
    end = 40;
  }
  var activeButton = this;
  if ((prevbutton + 1) == Number(activeButton.innerHTML)) {
    if (activeButton.innerHTML == end) {
      clearTimeout(stop);
      var yourTime = document.querySelector(".dyna").innerHTML;
      updateScores(yourTime);
      alert("You win in " + yourTime);
    }
    var parent = activeButton.parentElement;
    parent.style.opacity = 0;
    prevbutton = Number(activeButton.innerHTML);

    parent.addEventListener("transitionend", function(e) {
      parent.style.opacity = "100";
    });
    setTimeout(function() {
      activeButton.remove();
    }, 100);
  }
  else{
    var audio = new Audio('sounds/yellow.mp3');
    audio.play();
  }
}




//Scoreboard
const highScoresez = JSON.parse(localStorage.getItem("highScoresez")) || [];
const highScoreshrd = JSON.parse(localStorage.getItem("highScoreshrd")) || [];

function updateScores(yourTime) {
  var name = prompt("Enter your name");
  const board = {
    name: name,
    Time: yourTime
  };
  if (select == 1) {
    highScoresez.push(board);
    highScoresez.sort((a, b) => a.Time - b.Time);
    highScoresez.splice(5);
    localStorage.setItem('highScoresez', JSON.stringify(highScoresez));
  }
  else if (select > 1) {
    highScoreshrd.push(board);
    highScoreshrd.sort((a, b) => a.Time - b.Time);
    highScoreshrd.splice(5);
    localStorage.setItem('highScoreshrd', JSON.stringify(highScoreshrd));
  }
}

//Setting best time
if (highScoresez[0].Time != 'undefined') {
  document.querySelector(".best-time").innerHTML = highScoresez[0].Time;
}
