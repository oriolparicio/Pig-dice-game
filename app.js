/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores,
  roundScore,
  activePlayer,
  diceDom,
  diceDom1,
  gamePlaying,
  lastDice,
  dobleSix,
  totalWinVal,
  totalWin;

let init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  diceDom = $(".dice");
  diceDom1 = $(".dice1");
  gamePlaying = true;
  lastDice = 0;
  lastDice1 = 0;
  dobleSix = $(".dobleSix-" + activePlayer);
  $(".dobleSix-0").hide();
  $(".dobleSix-1").hide();

  totalWinVal = $(".totalWinInput").val(100);
  totalWin = totalWinVal.val();
  console.log(totalWin);

  $(".dice").hide(); // Ocultar dado //
  $(".dice1").hide(); // Ocultar dado //

  $("#score-0").text("0");
  $("#score-1").text("0");
  $("#current-0").text("0");
  $("#current-1").text("0");

  $("#name-0").text("Player 1");
  $("#name-1").text("Player 2");

  $(".player-0-panel").addClass("active");
  $(".player-1-panel").removeClass("active");

  $(".player-0-panel").removeClass("winner");
  $(".player-1-panel").removeClass("winner");
};

init();

let btn = () => {
  if (gamePlaying) {
    // NUMERO ALEATORIO DE DADO //
    dobleSix.hide();
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice1 = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    console.log(dice1);

    if (
      (lastDice == 6 && dice == 6) ||
      (lastDice1 == 6 && dice1 == 6) ||
      (dice == 6 && dice1 == 6)
    ) {
      $("#score-" + activePlayer).text(0);
      dobleSix.show();
      NextPlayer();
      console.log("FALLO" + lastDice);
    } else {
      lastDice = dice;
      lastDice1 = dice1;

      // DADO VISIBLE //

      diceDom.show();
      diceDom1.show();
      diceDom.attr("src", "dice-" + dice + ".png");
      diceDom1.attr("src", "dice-" + dice1 + ".png");

      // ACTUALIZAR SCORE //
      if (dice !== 1 && dice1 !== 1) {
        roundScore += dice;
        $("#current-" + activePlayer).text(roundScore);
      } else {
        NextPlayer();
      }
    }
  }
};
$(document).on("click", ".btn-roll", btn);

let btnHold = () => {
  if (gamePlaying) {
    // AÑADIR LA PUNTUACIÓN ACTUAL A PUNTUACIÓN TOTAL //
    scores[activePlayer] += roundScore;

    // ACTUALIZAR PUNTUACIÓN TOTAL //
    $("#score-" + activePlayer).text(scores[activePlayer]);

    // COMPROBAR SI ALGUN JUGADOR A LLEGADO A 100 //
    if (scores[activePlayer] >= totalWin) {
      $("#name-" + activePlayer).text("Winner!");
      diceDom.hide();
      diceDom1.hide();

      $(".player-" + activePlayer + "-panel").addClass("winner");
      $(".player-" + activePlayer + "-panel").removeClass("active");
      gamePlaying = false;
    } else {
      // SIGUIENTE TURNO //
      NextPlayer();
    }
  }
};
$(document).on("click", ".btn-hold", btnHold);

let btnTotalWin = () => {
  totalWinVal.val();
  totalWin = totalWinVal.val();
  console.log(totalWin);
};
$(document).on("click", ".btn-totalWin", btnTotalWin);

// SIGUIENTE TURNO //
let NextPlayer = () => {
  $("#current-" + activePlayer).text(0);

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  $(".player-0-panel").toggleClass("active");
  $(".player-1-panel").toggleClass("active");

  $(".dice").hide(); // Ocultar dado //
  $(".dice1").hide(); // Ocultar dado //

  // Reset lastDice
  lastDice = 0;
};

$(document).on("click", ".btn-new", init);
