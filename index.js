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
    document.querySelector(".Start").style.color = "white";
    document.querySelector(".Start").style.fontSize = "20rem";
    document.querySelector(".Start").style.margin = "0";
    if(window.matchMedia("(max-width: 600px)").matches){
      document.querySelector(".Start").style.padding = "0px 100px";
    }
    else{
    document.querySelector(".Start").style.padding = "35px 180px";
    }
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


// Sets the text of the divs in random order
function setDiv() {
  var arr1 = randGen(1);
  document.querySelectorAll(".box").forEach(box => {
    var btn = document.createElement("div");
    btn.className = "button btn";
    btn.innerHTML = arr1[0];
    var colorbtn = 40 - arr1[0];
    btn.style.backgroundColor = "rgb("+colorbtn+","+colorbtn+","+colorbtn+")";
    btn.addEventListener("click", change);
    arr1.shift();
    box.appendChild(btn);
  });

  if (select > 1) {
    var arr2 = randGen(21);
    document.querySelectorAll(".box").forEach(box => {
      var btn = document.createElement("div");
      btn.className = "button btn2";
      btn.innerHTML = arr2[0];
      var colorbtn = 40 - arr2[0];
      btn.style.backgroundColor = "rgb("+colorbtn+","+colorbtn+","+colorbtn+")";
      btn.addEventListener("click", change);
      arr2.shift();
      box.appendChild(btn);
    })
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
    var kick = new Audio('sounds/kick-bass.mp3');
    kick.play();
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
