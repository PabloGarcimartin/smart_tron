console.log("Inicio");

const timeDelay= 100;
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
  //inGameP1 = setInterval(movePlayerOneIA, timeDelay);
  inGameP2 = setInterval(movePlayerTwo, timeDelay);
};

function movePlayerOne(){
  movePlayerOneIA();
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

function movePlayerOneIA(){
    var playerOne = document.getElementsByClassName('playerOne active')[0];
    var playerOnePosition = playerOne.getBoundingClientRect();
    var playerOneX =  playerOne.style.left.replace('px', '');
    var playerOneY =  playerOne.style.top.replace('px', '');
    var playerTwo = document.getElementsByClassName('playerTwo active')[0];
    var playerTwoPosition = playerTwo.getBoundingClientRect();
    var playerTwoX =  playerTwo.style.left.replace('px', '');
    var playerTwoY =  playerTwo.style.top.replace('px', '');

    var data = {
      player1_name: "John",
      player1_x: playerOneX,
      player1_y: playerOneY,
      player1_angle: anglePlayerOne,
      player1_right: playerOneRight,
      player1_left: playerOneLeft,
      player2_name: "Jim",
      player2_x: playerTwoX,
      player2_y: playerTwoY,
      player2_angle: anglePlayerTwo,
      player2_right: playerTwoRight,
      player2_left: playerTwoLeft,
    };
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var req = new XMLHttpRequest();
    req.open("POST", "model_smart_tron.html", true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
          console.log(req.responseText);
          if(req.responseText == 0){
              console.log('LEFT');
              playerOneRight = false;
              playerOneLeft = true;
          } else if(req.responseText == 1){
              console.log('RIGHT');
              playerOneRight = true;
              playerOneLeft = false;
          } else if(req.responseText == 2){
              console.log('ALL STRAIGHT');
              playerOneRight = false;
              playerOneLeft = false;
          }
          //alert('moved');
        }
    }
    req.send(JSON.stringify(myJSON));
}

function movePlayerTwo(){
  movePlayerTwoIA();
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

function movePlayerTwoIA(){
    var playerOne = document.getElementsByClassName('playerOne active')[0];
    var playerOnePosition = playerOne.getBoundingClientRect();
    var playerOneX =  playerOne.style.left.replace('px', '');
    var playerOneY =  playerOne.style.top.replace('px', '');
    var playerTwo = document.getElementsByClassName('playerTwo active')[0];
    var playerTwoPosition = playerTwo.getBoundingClientRect();
    var playerTwoX =  playerTwo.style.left.replace('px', '');
    var playerTwoY =  playerTwo.style.top.replace('px', '');

    var data = {
      player1_name: "Player 2",
      player1_x: playerTwoX,
      player1_y: playerTwoY,
      player1_angle: anglePlayerTwo,
      player1_right: playerTwoRight,
      player1_left: playerTwoLeft,
      player2_name: "Player 1",
      player2_x: playerOneX,
      player2_y: playerOneY,
      player2_angle: anglePlayerOne,
      player2_right: playerOneRight,
      player2_left: playerOneLeft,
    };
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var req = new XMLHttpRequest();
    req.open("POST", "model_smart_tron.html", true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
          console.log(req.responseText);
          if(req.responseText == 0){
              console.log('LEFT');
              playerTwoRight = false;
              playerTwoLeft = true;
          } else if(req.responseText == 1){
              console.log('RIGHT');
              playerTwoRight = true;
              playerTwoLeft = false;
          } else if(req.responseText == 2){
              console.log('ALL STRAIGHT');
              playerTwoRight = false;
              playerTwoLeft = false;
          }
          //alert('moved');
        }
    }
    req.send(JSON.stringify(myJSON));
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
