let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

const choices = {
    rock: { name: 'グー', emoji: '✊' },
    paper: { name: 'パー', emoji: '✋' },
    scissors: { name: 'チョキ', emoji: '✌️' }
};

function getComputerChoice() {
    const choiceArray = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choiceArray[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    
    document.getElementById('playerChoice').innerHTML = 
        `あなた: ${choices[playerChoice].emoji} ${choices[playerChoice].name}`;
    document.getElementById('computerChoice').innerHTML = 
        `コンピュータ: ${choices[computerChoice].emoji} ${choices[computerChoice].name}`;
    
    const resultElement = document.getElementById('result');
    
    if (winner === 'player') {
        resultElement.textContent = '🎉 あなたの勝ち！';
        resultElement.className = 'result win';
        playerScore++;
    } else if (winner === 'computer') {
        resultElement.textContent = '😔 コンピュータの勝ち...';
        resultElement.className = 'result lose';
        computerScore++;
    } else {
        resultElement.textContent = '🤝 引き分け';
        resultElement.className = 'result draw';
        drawScore++;
    }
    
    updateScore();
}

function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('drawScore').textContent = drawScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    updateScore();
    
    document.getElementById('playerChoice').innerHTML = '';
    document.getElementById('computerChoice').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}