'use strict';

/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */
let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let pointsPlayer = 0,
    pointsPC = 0;

const btnPedir = document.getElementById('btnPedir');
const btnDetener = document.getElementById('btnDetener');
const btnNuevo = document.getElementById('btnNuevo');

const smalls = document.querySelectorAll('small');

const divJugador = document.getElementById('jugador-cartas');
const divPC = document.getElementById('computadora-cartas');

/**
 * Crea una nueva baraja
 */
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let t of types) {
            deck.push(`${i}${t}`)
        }
    }

    for (let t of types) {
        for (let s of specials) {
            deck.push(`${s}${t}`);
        }
    }

    return deck = _.shuffle(deck);
};

deck = createDeck();

/**
 * Tomar una carta
 */
const requestLetter = () => {
    if (deck.length === 0) throw new Error('No hay cartas en el deck');
    const c = deck.pop();
    return c;
};

/**
 * Valor de la carta
 * @param {string}
 */
const valueLetter = letter => {
    const value = letter.substring(0, letter.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10 :
        value * 1;
};

/**
 * Turno de la PC
 */
const pc = minPoints => {
    do {
        const letter = requestLetter()
        pointsPC = pointsPC + valueLetter(letter);
        smalls[1].innerHTML = pointsPC;

        const imgLetter = document.createElement('img');
        imgLetter.setAttribute('src', `assets/cartas/${letter}.png`);
        imgLetter.classList.add('carta');

        divPC.append(imgLetter);

        if (minPoints > 21) break;
    } while ((pointsPC < minPoints) && (minPoints <= 21));

    setTimeout(() => {
        if (pointsPC === minPoints) {
            alert('Nadie Gana :(');
        } else if (minPoints > 21) {
            alert('Computadora Gana');
        } else if (pointsPC > 21) {
            alert('Jugador Gana');
        } else {
            alert('Computadora gana');
        }
    }, 5);
};

// ********************** EVENTS **********************
/**
 * Pedir una carta
 */
btnPedir.addEventListener('click', () => {
    const letter = requestLetter()
    pointsPlayer = pointsPlayer + valueLetter(letter);
    smalls[0].innerHTML = pointsPlayer;

    const imgLetter = document.createElement('img');
    imgLetter.setAttribute('src', `assets/cartas/${letter}.png`);
    imgLetter.classList.add('carta');

    divJugador.append(imgLetter);

    if (pointsPlayer > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        pc(pointsPlayer);
    } else if (pointsPlayer === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        pc(pointsPlayer);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    pc(pointsPlayer);
});

btnNuevo.addEventListener('click', () => {
    deck = createDeck();

    pointsPlayer = 0;
    pointsPC = 0;

    smalls[0].innerHTML = 0;
    smalls[1].innerHTML = 0;

    divJugador.innerHTML = null;
    divPC.innerHTML = null;
});
