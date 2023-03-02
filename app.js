let wins = 0;
let losses = 0;
let ties = 0;

// Función para generar la elección de la computadora
function computerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Función para mostrar el resultado y actualizar el puntaje
function showResult(playerChoice, computerChoice) {
    const resultText = document.getElementById('result-text');
    let result;

    if (playerChoice === computerChoice) {
        result = 'Empate';
        ties++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'Ganaste \u{270C}';
        wins++;
        // Agregamos confetti cuando el jugador gana
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    } else {
        result = 'Perdiste \u{1F480}';
        losses++;
    }

    const playerChoiceText = playerChoice === 'rock' ? 'Piedra \u{1F5FF}' :
        playerChoice === 'paper' ? 'Papel \u{1F4DC}' : 'Tijeras \u{2702}';
    const computerChoiceText = computerChoice === 'rock' ? 'Piedra \u{1F5FF}' :
        computerChoice === 'paper' ? 'Papel \u{1F4DC}' : 'Tijeras \u{2702}';
    resultText.textContent = `${result} - Elegiste ${playerChoiceText}, la computadora eligió ${computerChoiceText}`;
    updateScore();
}

// Función auxiliar para traducir la elección del jugador o la computadora a español
function traducir(choice) {
    switch (choice) {
        case 'rock':
            return 'piedra';
        case 'paper':
            return 'papel';
        case 'scissors':
            return 'tijeras';
        default:
            return choice;
    }
}

// Función para actualizar el puntaje
function updateScore() {
    document.getElementById('wins').textContent = `Ganadas: ${wins}`;
    document.getElementById('losses').textContent = `Perdidas: ${losses}`;
    document.getElementById('ties').textContent = `Empates: ${ties}`;
}

// Función para manejar la elección del jugador
function playerChoice(choice) {
    const computer = computerChoice();
    showResult(choice, computer);
}

// Agregar controladores de eventos a los elementos .choice
document.querySelectorAll('.choice').forEach(function (choice) {
    choice.addEventListener('click', function () {
        playerChoice(this.id);
    });
});

// Evento para manejar el botón de reinicio
document.getElementById('reset-button').addEventListener('click', function () {
    ties = 0;
    wins = 0;
    losses = 0;
    updateScore();
    document.getElementById('result-text').textContent = '¿Piedra, papel o tijera?';
});

// Evento para manejar el botón de inicio
document.getElementById('start-button').addEventListener('click', function () {
    document.getElementById('result-text').textContent = '¿Piedra, papel o tijera?';
});
