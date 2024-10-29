const cardsArray = [
    { letter: 'A', text: 'Tricomoníase' },
    { letter: 'A', text: 'Pode causar desconforto genital, secreções anormais e aumentar o risco de outras DSTs.' },
    { letter: 'B', text: 'Hepatite B' },
    { letter: 'B', text: 'Pode causar doenças hepáticas crônicas, cirrose e câncer de fígado.' },
    { letter: 'C', text: 'HPV' },
    { letter: 'C', text: 'Pode causar verrugas genitais e está associado a câncer cervical e outros tipos de câncer.' },
    { letter: 'D', text: 'HIV/AIDS' },
    { letter: 'D', text: 'Ataca o sistema imunológico, levando à AIDS, que pode ser fatal sem tratamento adequado.' },
    { letter: 'E', text: 'Herpes Genital' },
    { letter: 'E', text: 'Causa feridas dolorosas; pode ser reativa e não tem cura, aumentando o risco de transmissão do HIV.' },
    { letter: 'F', text: 'Clamídia' },
    { letter: 'F', text: 'Muitas vezes assintomática; pode causar infertilidade, dor pélvica e complicações durante a gravidez.' },
    { letter: 'G', text: 'Gonorreia' },
    { letter: 'G', text: 'Pode levar a dor intensa, infecções pélvicas, infertilidade e complicações na gravidez.' },
    { letter: 'H', text: 'Sífilis' },
    { letter: 'H', text: 'Se não tratada, pode causar complicações graves como danos ao coração, cérebro e outros órgãos.' }
];

let cards = [...cardsArray];
let flippedCards = [];
let matchedCards = [];
let board = document.getElementById('grid');
let resetButton = document.getElementById('reset');
let startButton = document.getElementById('start-button');


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    board.innerHTML = '';
    shuffle(cards).forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card.letter; // Armazena a letra
        cardElement.dataset.text = card.text; // Armazena o texto
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (this.classList.contains('flipped') || matchedCards.includes(this)) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.text; // Exibe o texto correspondente
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    // Verifica se as letras correspondem
    if (firstCard.dataset.value === secondCard.dataset.value && firstCard.dataset.value !== 'A') {
        // Para 'A', a comparação é diferente
        if (firstCard.dataset.text === 'Tricomoníase' && secondCard.dataset.text === 'Pode causar desconforto genital, secreções anormais e aumentar o risco de outras DSTs.') {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedCards.push(firstCard, secondCard);
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = ''; // Limpa o texto
        secondCard.textContent = ''; // Limpa o texto
    }

    flippedCards = [];
}

resetButton.addEventListener('click', createBoard);

startButton.addEventListener('click', () => {
    modal.style.display = 'none';
    createBoard();
});

createBoard(); // Cria o tabuleiro vazio ao iniciar
