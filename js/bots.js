// Todo : Changer le mode de recherhce de medium qui fait tout de gauche -> droite et haut bas au lieu de partir du dernier bateua trouver


function generateBoardBot() {
    for (let i = 0; i < shipArray.length; i++) {
        switch (botDifficulty) {
            case "easy":
                generateEasy(shipArray[i])
                break;
            case "medium":
                generateEasy(shipArray[i])
                break;
            case "hard":
                generateHard(shipArray[i]);
            case "impossible":
                generateHard(shipArray[i]);
                break;
            default:
                alert('Difficulé du bot incorrect !')
        }
    }

}

function generateHitBot() {
    switch (botDifficulty) {
        case "easy":
            return botEasyHit()
        case "medium":
            return botMediumHit()
        case "hard":
            return botHardHit();
        case "impossible":
            return botImpossibleHit();
        default:
            alert('Difficulé du bot incorrect !')
    }

}


/**
 * 
 * Fonction de placement de bateaux
 * 
 */


function generateEasy(ship) {
    let direction = 10 ** Math.floor(Math.random() * 2) // = 1 -> Horizontal // = 10 -> Vertical
    let randomStarte = 0;


    // Bateau horizontal
    // Le bateau est horizontal, on doit faire en sorte que : UnitéDuDépart <= 10-LongueurBateau. Sinon le bateau sortira du tableau (vers la droite)
    if (direction == 1) {
        do {
            randomStarte = Math.floor(Math.random() * 100)
        } while (getUnite(randomStarte) >= 10 - ship.size)
    }

    // Bateau vertical
    // Dans le cas vertical, on a juste a prendre le nombre de possibilité (100 - 10*ship.size) et c'est bon
    // nombre de possibilité -> , car le départ du bateau ne peux pas se faire à 
    // l'extremité base (si le bateau est vertical ofc) car il ne rentrera pas
    else {
        randomStarte = (Math.floor(Math.random() * (100 - 10 * ship.size)))
    }

    // Maintenant la case de départ décidé on peux passé a la suite :)
    for (let i = 0; i <= ship.size; i++) {
        // Il y a déjà un bateau sur la trajectoire !. On se prends pas la tete on recommence.
        if (computerSquares[randomStarte + i * direction].classList.contains('taken')) {
            generateEasy(ship)
            return;
        }
    }
    // Si on arrive la, le chemin est safe maintenant on va refiare une boucle mais en ajoutant le bateux
    for (let i = 0; i <= ship.size; i++) {
        computerSquares[randomStarte + i * direction].classList.add('taken', ship.name)
    }
}

// Full aléatoire -> Algo IA prochainement
function generateMedium(ship) {

    let direction = 10 ** Math.floor(Math.random() * 2) // = 1 -> Horizontal // = 10 -> Vertical
    let randomStarte = 0;


    // Bateau horizontal
    // Le bateau est horizontal, on doit faire en sorte que : UnitéDuDépart <= 10-LongueurBateau. Sinon le bateau sortira du tableau (vers la droite)
    if (direction == 1) {
        do {
            randomStarte = Math.floor(Math.random() * 100)
        } while (getUnite(randomStarte) >= 10 - ship.size)
    }

    // Bateau vertical
    // Dans le cas vertical, on a juste a prendre le nombre de possibilité (100 - 10*ship.size) et c'est bon
    // nombre de possibilité -> , car le départ du bateau ne peux pas se faire à 
    // l'extremité base (si le bateau est vertical ofc) car il ne rentrera pas
    else {
        randomStarte = (Math.floor(Math.random() * (100 - 10 * ship.size)))
    }

    // Maintenant la case de départ décidé on peux passé a la suite :)
    for (let i = 0; i <= ship.size; i++) {
        // Il y a déjà un bateau sur la trajectoire !. On se prends pas la tete on recommence.
        if (computerSquares[randomStarte + i * direction].classList.contains('taken')) {
            generateMedium(ship)
            return;
        }
    }
    // Si on arrive la, le chemin est safe maintenant on va refiare une boucle mais en ajoutant le bateux
    for (let i = 0; i <= ship.size; i++) {
        computerSquares[randomStarte + i * direction].classList.add('taken', ship.name)
    }
}

function generateHard() {

}


//**
// 
// 
//  Fonctions de TIR
// 
// 
//  */


// Le bot tire au hasard completement sans stratégie 
function botEasyHit() {
    // On regarde si la case à déjà été tiré, si c'est le cas, on recommence l'opération
    do {
        differenceLoc = Math.floor(Math.random() * 100)
    } while (userSquares[differenceLoc].classList.contains('miss') || userSquares[differenceLoc].classList.contains('boom'));
    //console.log("La differenceLoc retourne est ", differenceLoc)
    return differenceLoc
}

// Le bot est le meme que le Easy, sauf que quand il touche une cible, il va tenter les cases a coté jusqu'à avoir la cible
function botMediumHit() {
    // Tout d'abord on regarde si un bateau a été touché sans être coulé :
    for (let bateauId = 0; bateauId < shipArray.length; bateauId++) {

        // On a trouvé un bateau qui a été touché et pas coulé !
        if (userLost[bateauId] > 0 && userLost[bateauId] <= shipArray[bateauId].size) {

            // Deux cas : 
            // - 1 seule case à été dévoilé, impossible de connaitre le sens
            // - >=2 cases dévoilé on connait le sens on continue !

            // 1er cas :
            if (userLost[bateauId] == 1) {
                do {
                    // !!!!!
                    // V2ERIFIER LE CAS DES BORDS !
                    // !!!! 

                    // Ici on vérifie que notre point n'est pas un bord. Si c'est le cas on peux pas taper n'importe ou
                    //On tire au sort (hasard) parmis les cases restante autour. On sait qu'il y en a forcément une : 4 cases : (+1, -1, +10, -10)
                    do {
                        differenceLoc = Math.floor(Math.random() * 3 - 1); // D'abord on tire un nombre qui est -1, 0, 1. Cependant si le nombre tiré est 0, on recommence
                    } while (differenceLoc == 0);

                    // Ensuite on tire (encore au hasard) un nombre qui est soit 0 soit 1 et on fait 10**{0,1}*nb. Ainsi on a une chance sur deux d'avoir +-10 et une chance sur deux d'avoir +-1
                    differenceLoc *= 10 ** (Math.floor(Math.random() * 2))

                    for (let coordonnee = 0; coordonnee < 99; coordonnee++) // On met 99, au cas ou le bateau est en bas a droite
                    {
                        if (userSquares[coordonnee].classList.contains(shipArray[bateauId].name) && userSquares[coordonnee].classList.contains('boom')) {

                            differenceLoc += coordonnee
                            // On vérifie si la differenceLoc sort du tableau
                            if ((getDizaine(differenceLoc) != getDizaine(coordonnee) && getUnite(differenceLoc) != getUnite(coordonnee)) || differenceLoc < 0 || differenceLoc > 99) {
                                // On remet la valeur de differenceLoc
                                differenceLoc -= coordonnee
                                continue;
                            }
                            console.log("valeur de base : ", coordonnee)
                            console.log("differenceLoc : ", differenceLoc)
                            break;
                            // On a désormais {-10,-1,1,10} avec un proba équiprobable
                        }
                    }
                    // Mais on doit maintennat vérifier que la case n'a pas déjà était attaqué, sinon on recommence (bourin / pas opti mais fonctionne)

                } while (userSquares[differenceLoc].classList.contains('miss') || userSquares[differenceLoc].classList.contains('boom'));
                // On a notre differenceLoc, on peux la retourner !
                return differenceLoc

                //2ème cas
            } else {
                console.log(">1 case")

                // On va commencer par chercher la direction :
                // On va un peu tricher sur ce coup, et on va parcourir le userSquare jusqu'à trouver un bateau du nom i. Si il existe un bateau juste a coté a la droite c'est que c'est horizontal. Sinon vertical
                for (let coordonnee = 0; coordonnee < 99; coordonnee++) // On met 99, au cas ou le bateau est en bas a droite
                {
                    if (userSquares[coordonnee].classList.contains(shipArray[bateauId].name)) {
                        // On vériife qu'on est pas dans un bord et qu'on sort de ce bord

                        // Cas horizontal
                        if (userSquares[coordonnee + 1].classList.contains(shipArray[bateauId].name)) {
                            //Un peu tricky, on choisi un coté (hasard) et on mets une case vers ce côté. Si il y a un miss. On arrete tout et on va de l'autre coté
                            // Si on a 0 on recommence
                            do {
                                differenceLoc = Math.floor(Math.random() * 2 - 1);
                            } while (differenceLoc == 0);

                            while (userSquares[coordonnee].classList.contains('boom')) {
                                // On vérifie si on a pas atteint un point déjà explorer ou il n'y avait rien
                                // remarque on a déjà vérifier que a minima la case du dessous continent le nom du bateau
                                if (userSquares[coordonnee].classList.contains('miss')) {
                                    coordonnee--
                                    break;
                                }
                                // On vérifie si on est sortie du tableau
                                if ((getDizaine(coordonnee) != getDizaine(coordonnee+differenceLoc) && getUnite(coordonnee) != getUnite(coordonnee+differenceLoc)) || coordonnee+differenceLoc < 0 || coordonnee+differenceLoc > 99) {
                                    break;
                                }
                                coordonnee += differenceLoc
                            }

                            // On est dans le cas ou c'était un case miss. On recommence a l'envers
                            if (userSquares[coordonnee].classList.contains('miss')) {
                                do {
                                    coordonnee -= differenceLoc
                                } while ((userSquares[coordonnee].classList.contains('boom')));
                            }
                        }
                        // Cas vertical
                        else {
                            if (userSquares[coordonnee + 10].classList.contains(shipArray[bateauId].name)) {
                                //Un peu tricky, on choisi un coté (hasard) et on mets une case vers ce côté. Si il y a un miss. On arrete tout et on va de l'autre coté
                                // Si on a 0 on recommence
                                do {
                                    differenceLoc = 10 * Math.floor(Math.random() * 2 - 1);
                                } while (differenceLoc == 0);

                                while (userSquares[coordonnee].classList.contains('boom')) {
                                    // On vérifie si on a pas atteint un point déjà explorer ou il n'y avait rien
                                    // remarque on a déjà vérifier que a minima la case du dessous continent le nom du bateau
                                    if (userSquares[coordonnee].classList.contains('miss')) {
                                        coordonnee -= 10
                                        break;
                                    }
                                    console.log("test de coordonnee ", coordonnee)
                                    coordonnee += 10
                                }

                                // On est dans le cas ou c'était un case miss. On recommence a l'envers
                                if (userSquares[coordonnee].classList.contains('miss')) {
                                    do {
                                        coordonnee -= 10
                                    } while ((userSquares[coordonnee].classList.contains('boom')));
                                }
                            }
                        }
                        // C'est bon on peux retourner j
                        return coordonnee
                    }
                }
            }

        }
    }

    // Si on arrive la, c'est qu'aucun bateau n'a été touché sans être coulé. On fait donc appelle a la méthode Easy
    return botEasyHit()

}

// Le bot a 100% De réussite
function botImpossibleHit() {
    for (let i = 0; i < 100; i++) {
        if (userSquares[i].classList.contains('taken') && !userSquares[i].classList.contains('boom')) {
            return i
        }
    }
    return 0
}