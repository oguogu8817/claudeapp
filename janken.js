let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let animationInterval = null;
let isAnimating = false;

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

function startGame() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('animationScreen').classList.remove('hidden');
    document.getElementById('gameResult').classList.add('hidden');
    
    startAnimation();
}

function startAnimation() {
    const animatedChoice = document.getElementById('animatedChoice');
    const choiceArray = ['✊', '✌️', '✋'];
    let currentIndex = 0;
    
    isAnimating = true;
    
    animationInterval = setInterval(() => {
        animatedChoice.textContent = choiceArray[currentIndex];
        currentIndex = (currentIndex + 1) % choiceArray.length;
    }, 200);
}

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    isAnimating = false;
}

function selectPlayerChoice(playerChoice) {
    if (!isAnimating) return;
    
    stopAnimation();
    
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    
    document.getElementById('animationScreen').classList.add('hidden');
    document.getElementById('gameResult').classList.remove('hidden');
    
    document.getElementById('playerChoice').innerHTML = 
        `${choices[playerChoice].emoji}<br>${choices[playerChoice].name}`;
    document.getElementById('computerChoice').innerHTML = 
        `${choices[computerChoice].emoji}<br>${choices[computerChoice].name}`;
    
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

function resetRound() {
    document.getElementById('gameResult').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
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
    
    stopAnimation();
    
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('animationScreen').classList.add('hidden');
    document.getElementById('gameResult').classList.add('hidden');
    
    document.getElementById('playerChoice').innerHTML = '';
    document.getElementById('computerChoice').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}