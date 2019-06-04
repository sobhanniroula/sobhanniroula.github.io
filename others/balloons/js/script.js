let colors = ['yellow', 'red', 'blue', 'violet', 'green'];

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');


function createBalloon() {
    let div = document.createElement('div');
    let randNum = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[randNum];

    randNum = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = randNum + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);
    animateBalloon(div);
}


function animateBalloon(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

    function frame() {
        if (pos >= (windowHeight + 200) && (document.querySelector('[data-number="' + elem.dataset.number + '"]') !== null)) {
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

function deleteBalloon(elem) {
    elem.remove();
    num++;
    updateScore();
    playBallSound();
}

function playBallSound() {
    let audio = document.createElement('audio');
    audio.src = 'audio/pop.mp3';
    audio.play();
}

function updateScore() {
    for (let i = 0; i < scores.length; i++) {
        scores[i].textContent = num;
    }
}

function startGame() {
    restartGame();
    //    const audioBg = new Audio('../audio/bg-music.mp3');
    //    audioBg.play();
    let timeout = 0;

    let loop = setInterval(function () {
        timeOut = Math.floor(Math.random() * 600 - 100);
        if (!gameOver && num !== total) {
            createBalloon();
        } else if (num !== total) {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        } else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout);
}

function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon');
    for (let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    }
})

document.querySelector('.restart').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
})
document.querySelector('.cancel').addEventListener('click', function () {
    totalShadow.style.display = 'none';
});


startGame();