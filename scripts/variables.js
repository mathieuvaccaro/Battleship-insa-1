// Ce fichier permet de stocker l'intégralité des variables utilisé le long du jeu (pendant le placement des bateaux / jeu solo/ jeu multi)
// Nous les avons mis dans un fichier séparé afin que tout soit plus lisible et pour éviter les doublons


// Single Player & Multi Player & ShipPlacements


// Les différents boutons en bas de l'écran
const startButton = document.querySelector('#start')
const rotateButton = document.querySelector('#rotate')
const resetButton = document.querySelector('#reset')
const replayButton = document.querySelector('#replay')
const buttons = document.querySelector('#setup-buttons')

// Les différents plateaux de jeu 
const userGrid = document.querySelector('.grid-user') // Plateau du joueur
const computerGrid = document.querySelector('.grid-computer') // Plateau de l'ordi
const displayGrid = document.querySelector('.grid-display') // Les bateaux pour la selection
const originalGrid = document.querySelector('.grid-original') // Les bateaux pour la selection (backup utile pour le reset)

// TEster a metrte en const
// Tous les bateaux en bas avant de les placer
let ships = document.querySelectorAll('.ship')
let destroyer = document.querySelector('.destroyer-container')
let submarine = document.querySelector('.submarine-container')
let cruiser = document.querySelector('.cruiser-container')
let battleship = document.querySelector('.battleship-container')
let carrier = document.querySelector('.carrier-container')

let allShipsPlaced = false;

// Message indicatif (*)
const turnDisplay = document.querySelector('#whose-go')

let userSquares = [] // Tableau de ma partie , 1d 100 cases
let computerSquares = []
let alreadyShow = [] // Tableau listant toutes les cases déjà viser (en attaque)
let userLost = [0,0,0,0,0] // Tableau contenant tous les bateaux de l'user perdu, on l'init a 0 pour incrémenter plus tard
let enemyLost = [0,0,0,0,0] // Tableau contenant tous les bateaux de l'adeversaire perdu, on l'init a 0 pour incrémenter plus tard

let isHorizontal = true
const width = 10

let shotFired = -1

let casePreciseDernierBateauSelect // Précisement le fragement de bateau cliquer
let draggedShip

let botDifficulty = "medium" // Easy -> Tir et Placement aléaoitre // Medium -> Placement aléatoire et proba de touché légérement augmenter // Hard -> Placement suivant modèle math + attaque suivant modèle math // Impossible : placement Hard + attaque 100% bonné (c'est plus un modèle pour tester ^^)
let gameMode = "singleplayer" // singleplayer / multiplayer

let currentPlayer = "computer" // Un peu contre intuitif, il faut mettre le nom de la personne qui NE commence PAS
let player1 = "user" // Nom du joueur 1 (le joueur sur la session)
let player2 = "computer" // Nom du joueur 2 (adversaire)

const reflexionComputer = 1000 // temps de reflexion du bot en ms (utile pour debug) , defaut : 1000

// Single Player & Multi Player

// La liste est responsive, on peux très bien modifier la liste (ajouter, modifier ou supprimer des bateaux)
const shipArray = [
    {
      name: 'destroyer',
      size: 1,
    },
    {
      name: 'submarine',
      size: 2,
    },
    {
      name: 'cruiser',
      size: 2,
    },
    {
      name: 'battleship',
      size: 3,
    },
    {
      name: 'carrier',
      size: 4,
    },
  ]

let destroyerCount = 0
let submarineCount = 0
let cruiserCount = 0
let battleshipCount = 0
let carrierCount = 0

let cpuDestroyerCount = 0
let cpuSubmarineCount = 0
let cpuCruiserCount = 0
let cpuBattleshipCount = 0
let cpuCarrierCount = 0



