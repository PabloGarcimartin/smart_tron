console.log("Inicio");

const timeDelay= 50;
const anguloGiro = Math.PI / 20;
const distanciaPaso = 4;
var tablero=document.getElementById("tablero");
var tableroHeight = $('#tablero').height();
var tableroWidth = $('#tablero').width();
var tablero = document.getElementById('tablero');
var tableroPosition = tablero.getBoundingClientRect();
var tableroX = tableroPosition.left;
var tableroY = tableroPosition.top;
var playerOneLeft = false;
var playerOneRight = false;
var playerTwoLeft = false;
var playerTwoRight = false;

var anglePlayerOne = 0;
var anglePlayerTwo = 0;

$(document).ready(function(){
    setStartPlayerOne();
    setStartPlayerTwo();

    $('#start').on('click', function(){
      setStartPlayerOne();
      setStartPlayerTwo();
      sleep(1000);
      playersMovement();
      animateStart();
    });

    $('#python').on('click', function(){
      moveIA();
    });

});

function setStartPlayerOne(){
    var newq = makeNewPosition();
    var d = document.getElementById('playerOne');
    d.style.position = "absolute";
    d.style.left = newq[0]+'px';
    d.style.top = newq[1]+'px';
    anglePlayerOne = Math.floor(Math.random() * 2 * Math.PI);
};

function setStartPlayerTwo(){
    var newq = makeNewPosition();
    var d = document.getElementById('playerTwo');
    d.style.position = "absolute";
    d.style.left = newq[0]+'px';
    d.style.top = newq[1]+'px';
    anglePlayerTwo = Math.floor(Math.random() * 2 * Math.PI);
};

function makeNewPosition(){

    var h = tableroHeight - 50;
    var w = tableroWidth - 50;

    var nh = Math.floor(Math.random() * h) + 25;
    var nw = Math.floor(Math.random() * w) + 25;

    return [nh,nw];

}

var inGame;
function animateStart(){
  $('.player:not(.active)').remove();
  //$('#start').hide();

  inGameP1 = setInterval(movePlayerOne, timeDelay);
  inGameP2 = setInterval(movePlayerTwo, timeDelay);
};

function movePlayerOne(){
  let finalX = 0;
  let finalY = 0;
  var playerOne = document.getElementsByClassName('playerOne active')[0];
  var playerOne$ = $('.playerOne.active');
  var playerOnePosition = playerOne.getBoundingClientRect();
  var playerOneX =  playerOne.style.left.replace('px', '');
  var playerOneY =  playerOne.style.top.replace('px', '');
  let newPlayerOne = playerOne$.clone();
  playerOne$.removeClass('active');
  newPlayerOne.addClass('active');
  $( "#tablero" ).append(newPlayerOne);

  if(playerOneLeft && !playerOneRight){
    anglePlayerOne = anglePlayerOne + anguloGiro;
  } else if(playerOneRight && !playerOneLeft){
    anglePlayerOne = anglePlayerOne - anguloGiro;
  }
  x = parseInt(playerOneX) + Math.cos(anglePlayerOne) * distanciaPaso;
  y = parseInt(playerOneY) + Math.sin(anglePlayerOne) * distanciaPaso;

  checkColission(1);
  if( checkBorders(1) ){
    newPlayerOne[0].style.left = x+'px';
    newPlayerOne[0].style.top = y+'px';
  }
}

function movePlayerTwo(){
  var playerTwo = document.getElementsByClassName('playerTwo active')[0];
  var playerTwo$ = $('.playerTwo.active');
  var playerTwoPosition = playerTwo.getBoundingClientRect();
  var playerTwoX =  playerTwo.style.left.replace('px', '');
  var playerTwoY =  playerTwo.style.top.replace('px', '');
  let newPlayerTwo = playerTwo$.clone();
  playerTwo$.removeClass('active');
  newPlayerTwo.addClass('active');
  $( "#tablero" ).append(newPlayerTwo);

  if(playerTwoLeft && !playerTwoRight){
    anglePlayerTwo = anglePlayerTwo + anguloGiro;
  } else if(playerTwoRight && !playerTwoLeft){
    anglePlayerTwo = anglePlayerTwo - anguloGiro;
  }
  x2 = parseInt(playerTwoX) + Math.cos(anglePlayerTwo) *  distanciaPaso;
  y2 = parseInt(playerTwoY) + Math.sin(anglePlayerTwo) *  distanciaPaso;

  checkColission(2);
  if( checkBorders(2) ){
    newPlayerTwo[0].style.left = x2+'px';
    newPlayerTwo[0].style.top = y2+'px';
  }
}

function checkBorders(player){
  var collider_selector = '';
  let claerInt;
  obstacle_selector = "#tablero";
  if (player === 1) {
    collider_selector = ".playerOne.active";
    clearInt = inGameP1;
  } else {
    collider_selector = ".playerTwo.active";
    clearInt = inGameP2;
  }
  var hits = $(collider_selector).collision(obstacle_selector, { mode: "protrusion"});

  if( hits.length > 0 ){
    clearInterval(clearInt);
    console.log('PLAYER '+player+' LOSES');
    console.log(hits);
    console.log('**********************');
    return false;
  }
  return true;
}

function checkColission(player){
  var collider_selector = '';
  let claerInt;
  if (player === 1) {
    collider_selector = ".playerOne.active";
    obstacle_selector = ".playerTwo";
    player_selector = ".playerOne";
    clearInt = inGameP1;
  } else {
    collider_selector = ".playerTwo.active";
    obstacle_selector = ".playerOne";
    player_selector = ".playerTwo";
    clearInt = inGameP2;
  }
  var hits = $(collider_selector).collision(obstacle_selector, { mode: "collision"});
  var self_hits = $(collider_selector).collision(player_selector, { mode: "collision"});

  if( hits.length > 0 ){
    clearInterval(clearInt);
    console.log('PLAYER '+player+' LOSES');
    console.log(hits);
    console.log('**********************');
  }

  if( self_hits.length > 5 ){
    clearInterval(clearInt);
    console.log('PLAYER '+player+' LOSES');
    console.log(self_hits);
    console.log('**********************');
  }
}

function playersMovement() {
  window.onkeydown= function(key){
        if(key.keyCode === 68){
          playerOneLeft = true;
        } else if(key.keyCode === 65)
        {
           playerOneRight = true;
        }

        if(key.keyCode === 39){
          playerTwoLeft = true;
        } else if(key.keyCode === 37)
        {
           playerTwoRight = true;
        }
  };

  window.onkeyup= function(key){
        if(key.keyCode === 68){
          playerOneLeft = false;
        } else if(key.keyCode === 65)
        {
           playerOneRight = false;
        }

        if(key.keyCode === 39){
          playerTwoLeft = false;
        } else if(key.keyCode === 37)
        {
           playerTwoRight = false;
        }
  };
}

function moveIA(){
  let text = "resultado";

  $.ajax({
   type: "POST",
   url: "http://localhost:8000/modelo.py",
   data: { param: text}
  }).done(function( o ) {
    console.log(o);
  });

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function xml_http_post(url, data) {
  var formData = new FormData();

  formData.append("username", data);
  formData.append("accountnum", 123456);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onreadystatechange = function() {
  xhr.send(formData);
  console.log("Python button clicked")
  console.log(xhr.readyState)
  if (xhr.readyState == 4) {
      console.log(req.responseText);
      }
  }


  // var req = new XMLHttpRequest();
  // req.open("POST", url, true);
  // req.onreadystatechange = function() {
  //     if (req.readyState == 4) {
  //     console.log(req.responseText);
  //     }
  // }
  // req.send(data);
}

function runbuttonfunc() {
    xml_http_post("model_smart_tron.html", "uolalalalal")
}

document.getElementById("runButton").onclick = runbuttonfunc;
