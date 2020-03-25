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
const smalls = document.querySelectorAll('small');
const divJugador = document.getElementById('jugador-cartas');

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
    // do {

    // } while ();
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
    } else if (pointsPlayer === 21) {
        btnPedir.disabled = true;
    }
});