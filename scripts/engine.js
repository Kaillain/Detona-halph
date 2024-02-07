const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value: {
        gameVelocity: 1000,
        hitposition: 0,
        result: 0,
        curretTime: 60,
    },
    action: {
        timeId: null,
        countDownTimeId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.value.curretTime--;
    state.view.timeleft.textContent = state.value.curretTime; 

    if(state.value.curretTime === 0 ) {
        clearInterval(state.action.countDownTimeId);
        clearInterval(state.action.timeId);
        alert ("Game Over!! O seu resultado foi : " + state.value.result);
    }
}

function playSound() {
    let audio = new Audio("./audio/som.m4a.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare( ){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");

    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitposition = randomSquare.id; 
}

function moveEnemy(){
    state.value.timeId = setInterval(randomSquare, state.value.gameVelocity   );
}




function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitposition){
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.value.hitposition = null
                playSound();
            }
        })
    }); 
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();