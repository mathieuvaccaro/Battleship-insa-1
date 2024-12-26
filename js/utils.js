// ce fichier regroupe toutes les petites fonctions utiles a tous les scripts :
printWithDelay
// Arg : 
function printWithDelay() {
  let text = ""
  let delay = 0
  for (let i = 0; i < arguments.length; i++) {
    if (i != arguments.length - 1) text += " " + arguments[i]
    if (i == arguments.length - 1) delay = arguments[i]
  }

  turnDisplay.innerHTML = text;
  setTimeout(function () {
    turnDisplay.innerHTML = "";
  }, delay);
}

// Ajouter une manière de mettre des varaibles dedans
function print() {
  let text = ""
  for (let i = 0; i < arguments.length; i++) {
    text += " " + arguments[i]
  }

  turnDisplay.innerHTML = text;
}

function clear() {

  turnDisplay.innerHTML = ""
}

function isGameOver() {
  return false
}

function checkForWins() {
  // A refaire
}

function getDizaine(number) {
  return (parseInt(number / 10, 10))
}

function getUnite(number) {
  return (number - getDizaine(number) * 10)
}

function delai(delai) {

}

function restart()
{
  window.location.reload();
}
