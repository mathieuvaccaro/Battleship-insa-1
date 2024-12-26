let waitUser = false; // Cette variable permet de compter les clqiues uniqument quand c'est au tour de l'utilsiateur
let resultat = 0 // = 1 si user1 gagne = -1 si computer gagne

let debugMode = false // Seul l'ordinateur joue (pour le debug)

// Single Player
function startSinglePlayer(userSquares) {

  this.userSquares = userSquares
  generateBoardBot();

  //console.log(computerSquares)
  //console.log(userSquares)
  registerEvent() // Permet d'activer l'event du click
  gameLogic() // Déroulement de la partie (a qui est le tour ...)

}

// Juste enregistrer l'évenemtn de clqiuer
function registerEvent() {
  for (let i = 0; i < 100; i++) {
    computerSquares[i].addEventListener('click', function (event) {
      if (waitUser) playerTurn(currentPlayer, i); // Permet d'éviter que le joueur puisse cliquer quand ce n'est pas à lui
    });
  }
}

function gameLogic() {
  resultat = isFinish();
  if (resultat != 0) {
    replayButton.style.display = "block"
    if (resultat == 1) {
      print("Félicitaion, vous avez gagné :)")
    }
    else {
      print("Vous avez perdu :(")
    }

  }
  else {

    // On échange les roles (étant donné que dans variable.js le nom du départ n'est pas celui qui commence pg)
    if (currentPlayer == player1) {
      currentPlayer = player2
    }
    else {
      currentPlayer = player1
    }


    if (currentPlayer == player1) {
      print("C'est à vous de jouer !")
    
      if(debugMode)
        {
            currentPlayer == player2
      
        gameLogic()
        }
      waitUser = true; // on active le clique en activant l'event
    }
    else {
      print("C'est au tour de l'adversaire")
      playerTurn(currentPlayer, generateHitBot())

    }
  }
}


// Le joueur doit joué (mais c'est l'user ou computer)
function playerTurn(joueur, loc) {
  waitUser = false; // On désactive le clic (afin d'éviter le spamclick)

  // Tour du joueur principale (celui de la sessioj)
  if (joueur == player1) {
    if (alreadyShow.includes(loc)) {
      print("Vous avez déjà touché la case n°", loc)
      waitUser = true; // le clic n'était pas bon, on ré-active l'évent
    }
    else {
      alreadyShow.push(loc)
      revealSquare(joueur, loc)
    }
  }
  // Au tour du computer
  else {
    // On attends 1 seconde pour faire un peu de roleplay ^^
    setTimeout(function () {
      revealSquare(joueur, generateHitBot())
    }, reflexionComputer);
  }

}


function revealSquare(joueur, loc) {
  // SI le jeu se fait par le joueur1
  if (joueur == player1) {
    if (computerSquares[loc].classList.contains("taken")) {
      // TOUCHE
      computerSquares[loc].classList.add('boom')
      // Regardons lequel :

      for (let i = 0; i < shipArray.length; i++) {
        if (computerSquares[loc].classList.contains(shipArray[i].name)) {
          // C'est le bateau d'indice i dans la liste !
          enemyLost[i]++

          // On regarde si c'étiat le coup fatal ?
          if (enemyLost[i] == shipArray[i].size + 1) {
            print("Coulé !")
          }
          else {
            print("Touché !")
          }
        }
      }
    }
    else {
      computerSquares[loc].classList.add('miss')
      print("Raté")
    }

    // Sinon par le robot :
  } else {

    // Le robot a touché 
    //console.log(userSquares.length); // Doit être 100
    //console.log(userSquares); // Vérifiez que tous les éléments sont valides
    //console.log("la loc v2 est ", loc)
    //console.log("debur : ", userSquares[0].classList)
    if (userSquares[loc].classList.contains("taken")) {
      userSquares[loc].classList.add('boom')

      for (let i = 0; i < shipArray.length; i++) {
        if (userSquares[loc].classList.contains(shipArray[i].name)) {
          // C'est le bateau d'indice i dans la liste !
          userLost[i]++

          // On regarde si c'étiat le coup fatal ?
          if (userLost[i] == shipArray[i].size + 1) {
            print("Coulé !")
          }
          else {
            print("Touché !")
          }
        }
      }
    }
    // Le robot n'a pas touché
    else {
      userSquares[loc].classList.add('miss')
      print("Raté")
    }
  }

  // Le jeu terminé, on rappelle gamelogic pour la suite (après une seconde de délai):
  setTimeout(function () {
    gameLogic();
  }, 1000);
}

// Retourne 0 si non, 1 si user a gagné -1 si computer a gagne
function isFinish() {
  let user1Finish = true
  let user2Finish = true
  for (let i = 0; i < shipArray.length; i++) {
    if (userLost[i] <= shipArray[i].size) user2Finish = false;
    if (enemyLost[i] <= shipArray[i].size) user1Finish = false;
  }

  if (user1Finish) return 1
  if (user2Finish) return -1
  return 0
}
