/**
 * @author Acxel Morales <https://acxelmorales.github.io/Acxel-Morales>
 * @version 0.0.2
 * @fileoverview Juego, BlackJack
 */

const myModule = (() => {
    'use strict';

    /**
     * 2C = Two of Clubs
     * 2D = Two of Diamonds
     * 2H = Two of Hearts
     * 2S = Two of Spades
     */
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    const btnPedir = document.getElementById('btnPedir'),
        btnDetener = document.getElementById('btnDetener'),
        btnNuevo = document.getElementById('btnNuevo');

    const smalls = document.querySelectorAll('small'),
        divLettersPlayer = document.querySelectorAll('.div-cartas');

    /**
     * Inicializar la app
     */
    const initGame = (numPlayers = 2) => {
        deck = createDeck();
        playersPoints = [];

        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }

        smalls.forEach(e => e.innerText = 0);
        divLettersPlayer.forEach(e => e.innerHTML = null);

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    /**
     * Crea una nueva baraja
     * @return {[]}
     */
    const createDeck = () => {
        deck = [];

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

    /**
     * Tomar una carta
     * @return {function}
     */
    const requestLetter = () => {
        if (deck.length === 0) throw new Error('No hay cartas en el deck');
        return deck.pop();
    };

    /**
     * Valor de la carta
     * @param {string} letter
     * @return {number}
     */
    const valueLetter = letter => {
        const value = letter.substring(0, letter.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10 :
            value * 1;
    };

    /**
     * Turno: 0 = primer jugador y el último será la pc
     * @param {number} turn
     * @param {string} letter
     * @return {number}
     */
    const accumulatePoints = (turn, letter) => {
        playersPoints[turn] = playersPoints[turn] + valueLetter(letter);
        smalls[turn].innerHTML = playersPoints[turn];

        return playersPoints[turn];
    };

    /**
     * Crea una carta en el HTML
     * @param {string} letter
     * @param {number} turn
     */
    const createLetter = (letter, turn) => {
        const imgLetter = document.createElement('img');
        imgLetter.setAttribute('src', `assets/cartas/${letter}.png`);
        imgLetter.classList.add('carta');

        divLettersPlayer[turn].append(imgLetter);
    };

    /**
     * Determina el ganador
     */
    const winer = () => {
        const [minPoints, pointsPC] = playersPoints;

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
        }, 100);
    }

    /**
     * Turno de la PC
     * @param {number} minPoints
     */
    const pc = minPoints => {
        let pointsPC = 0;

        do {
            const letter = requestLetter();

            pointsPC = accumulatePoints(playersPoints.length - 1, letter);
            createLetter(letter, playersPoints.length - 1);
        } while ((pointsPC < minPoints) && (minPoints <= 21));

        winer(pointsPC, playersPoints.length - 1);
    };

    // ********************** EVENTS **********************
    /**
     * Pedir una carta
     */
    btnPedir.addEventListener('click', () => {
        const letter = requestLetter();
        const pointsPlayer = accumulatePoints(0, letter);

        createLetter(letter, 0);

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

        pc(playersPoints[0]);
    });

    btnNuevo.addEventListener('click', () => {
        initGame();
    });

    return { newGame: initGame };
})();