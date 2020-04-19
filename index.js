//Timer
var stop ="";
function timer(start)
{
   var end = (new Date).getTime();
   var delta = (end - start)/1000;
   delta.toFixed(3);
   document.querySelector(".dyna").innerHTML = delta;
   stop = setTimeout(function(){timer(start)}, 30);
}


//Countdown
var count = 3;
function countdown() {
    if (count > 0) {
        document.querySelector(".Start").style.color = "white";
        document.querySelector(".Start").style.fontSize = "20rem";
        document.querySelector(".Start").style.margin = "0";
        document.querySelector(".Start").style.padding = "35px 180px";
        document.querySelector(".Start").innerHTML = count;
        count--;
        setTimeout(countdown, 1000);
    }
    else{
      var start = (new Date).getTime();
      document.querySelector(".Start").remove();
      const box = document.querySelectorAll(".box");
      box.forEach( boxs => boxs.style.opacity=100)
      timer(start);
    }
}


// Start Button
document.querySelector(".Start").addEventListener("click",function(){
  clearTimeout(stop);
  countdown();
});


//Restart button
document.querySelector("#restart").addEventListener("click",function(){
  location.reload();
});


// Generates a random array with the next 20 numbers including  min
function randGen(min){
  var arr = [];
  while(arr.length < 20){
      var r = Math.floor(Math.random() * 20) + min;
      if(arr.indexOf(r) === -1) arr.push(r);
    }
  return arr;
}


// Sets the text of the divs in random order
arr1 = randGen(1);
for(var i=0; i<20; i++)
{
  document.querySelectorAll(".btn")[i].innerHTML = arr1[i];
}

arr2 = randGen(21);
for(var i=0; i<20; i++)
{
  document.querySelectorAll(".btn2")[i].innerHTML = arr2[i];
}


//Event Listner
var prevbutton = 0;
for(var i=0; i<40; i++)
{
  document.querySelectorAll(".button")[i].addEventListener("click",function(){
    var activeButton = this;
    if((prevbutton + 1) == Number(activeButton.innerHTML)) {
      if(activeButton.innerHTML == 40){
        clearTimeout(stop);
        var yourTime =  document.querySelector(".dyna").innerHTML;
        updateScores(yourTime);
        alert("You win in "+yourTime);
      }
      var parent = activeButton.parentElement;
      parent.style.opacity = 0;
      prevbutton = Number(activeButton.innerHTML);

      parent.addEventListener("transitionend",function(e){
        parent.style.opacity = "100";
      });
      setTimeout(function(){
        activeButton.remove();
      },100);
    }

    }
  );
}


//Scoreboard
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
function updateScores(yourTime){
    var name = prompt("Enter your name");
    const board = {name:name , Time:yourTime};
    highScores.push(board);
    highScores.sort((a,b) => a.Time - b.Time);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

//Setting best time

if(highScores[0].Time != 'undefined')
{
  document.querySelector(".best-time").innerHTML = highScores[0].Time;
}
