/*----- constants -----*/
const players = {
    '1': 'Player 1',
    '-1': 'Player 2'
};
let gameboard = [
    ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], [],
    ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], []
];
let adjacent = [[0, 12], [1, 11], [2, 10], [3, 9], [4, 8], [5, 7]];
/*----- app's state (variables) -----*/
let points1 = 0;
let points2 = 0;
let turn = 1;
/*----- cached element references -----*/
let pitEls = document.querySelectorAll('.pit');
let textEl  = document.querySelector('h2');
let point1Els = document.querySelector('.player1'); 
let point2Els = document.querySelector('.player2');
/*----- event listeners -----*/
document.querySelector('.gameboard').addEventListener('click', handleChoice);
document.querySelector('button').addEventListener('click', reset);
/*----- functions -----*/
render();

function handleChoice(evt) {
    if (evt.target.id && evt.target.id !== 'p6' && evt.target.id !== 'p13') {
        let num = parseInt(evt.target.id.slice(1));
        let gameboardPieces = [...gameboard[num]];
        let clickedNum = num;
        if (gameboard[clickedNum].length && ((turn === -1 && clickedNum > 6) || (turn === 1 && clickedNum < 6))) {
            let idx = 0;
            while (idx < gameboardPieces.length) { 
                let endPiece = gameboard[clickedNum].pop();
                num++;
                idx++;
                if (num == 14) num = 0;
                if (num === 13 && turn === 1) {
                    num = 0;
                } else if (num === 6 && turn === -1) {
                    num++;
                }
                if ((turn === 1 && num === 6 && endPiece == gameboardPieces[0]) || (turn === -1 && num === 13 && endPiece == gameboardPieces[0])) {
                    turn *= -1;
                }
                gameboard[num] = [...gameboard[num], endPiece].flat(Infinity);
            }
            if (clickedNum + gameboardPieces.length <= 13) {
                let targetNum = clickedNum + gameboardPieces.length;
                steal(gameboardPieces[0], targetNum);
            } else {
                let targetNum = clickedNum + gameboardPieces.length;
                targetNum = targetNum - 14;
                steal(gameboardPieces[0], targetNum);
            }
            turn *= -1;
            gameboard[clickedNum] = [];
            render();
        }
    }
}

function steal(lastPiece, targetNum) {
    if ((turn === 1 && targetNum < 6) || (turn === -1 && targetNum > 6 && targetNum < 13)) {
        if (gameboard[targetNum].length === 1 && gameboard[targetNum][0] == lastPiece && targetNum !==6 && targetNum !== 13) {
            if (turn === 1) {
                gameboard[6].push(lastPiece);
            } else {
                gameboard[13].push(lastPiece);
            }
        gameboard[targetNum] = [];
        adjacent.forEach(subArr => {
            if (subArr[0] == targetNum) {
                if (turn == 1) {
                    gameboard[6] = [...gameboard[6], gameboard[subArr[1]]].flat(Infinity);
                } else {
                    gameboard[13] = [...gameboard[13], gameboard[subArr[1]]].flat(Infinity);
                }
                gameboard[subArr[1]] = [];
            } else if (subArr[1] == targetNum) {
                if (turn == 1) {
                    gameboard[6] = [...gameboard[6], gameboard[subArr[0]]].flat(Infinity);
                } else {
                    gameboard[13] = [...gameboard[13], gameboard[subArr[0]]].flat(Infinity);
                }
                gameboard[subArr[0]] =[];
            }
        }) 
        }
    }
}    
        
function render() {
    if ((gameboard[0].length === 0) && (gameboard[1].length === 0) && (gameboard[2].length === 0) && (gameboard[3].length === 0) && (gameboard[4].length === 0) && (gameboard[5].length === 0)) { 
        let tempBoard = [...gameboard[12], ...gameboard[11], ...gameboard[10], ...gameboard[9], ...gameboard[8], ...gameboard[7]];
        gameboard[6] = [...gameboard[6], ...tempBoard];
        getWinner();
    } else if ((gameboard[12].length === 0) && (gameboard[11].length === 0) && (gameboard[10].length === 0) && (gameboard[9].length === 0) && (gameboard[8].length === 0) && (gameboard[7].length === 0)) {
        let tempBoard = [...gameboard[0], ...gameboard[1], ...gameboard[2], ...gameboard[3], ...gameboard[4], ...gameboard[5]];
        gameboard[13] = [...gameboard[13], ...tempBoard]; 
        getWinner();
    } else {
        textEl.innerHTML = `${players[turn]}'s Turn`;
    }
    pitEls.forEach(pit => {
        pit.innerHTML = "";
        let idx = parseInt(pit.id.substring(1,3));
        gameboard[idx].forEach(elem => {
            if (elem == "r1") { 
                let divEl = document.createElement('div');
                divEl.style.width = "20px";
                divEl.style.height = "20px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "red";
                divEl.style.boxShadow = "-2px -2px 4px #8B0000 inset";
                pit.appendChild(divEl);
            } else  if (elem == "b1") { 
                let divEl = document.createElement('div');
                divEl.style.width = "20px";
                divEl.style.height = "20px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "blue";
                divEl.style.boxShadow = "-2px -2px 4px #152238 inset";
                pit.appendChild(divEl);
            }  else if (elem == "g1") { 
                let divEl = document.createElement('div');
                divEl.style.width = "20px";
                divEl.style.height = "20px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "green";
                divEl.style.boxShadow = "-2px -2px 4px #023020 inset";
                pit.appendChild(divEl);
            }  else if (elem == "y1") { 
                let divEl = document.createElement('div');
                divEl.style.width = "20px";
                divEl.style.height = "20px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "yellow";
                divEl.style.boxShadow = "-2px -2px 4px #8B8000 inset";
                pit.appendChild(divEl);
            }
        });
    });
    points();
};

function points() {
    points1 = gameboard[6].length;
    point1Els.textContent =  `${points1}`;
    points2 = gameboard[13].length;
    point2Els.textContent =  `${points2}`;
};

function getWinner() {
    if (gameboard[6].length > gameboard[13].length) {
        textEl.innerHTML = 'Congrats Player 1 Won!';
    } else if (gameboard[13].length > gameboard[6].length) {
        textEl.innerHTML = 'Congrats Player 2 Won!';
    } else if (gameboard[6].length = gameboard[13].length) {
        textEl.innerHTML = "Darn! It's a Tie!";
    }
    gameboard = [[], [], [], [], [], [], [...gameboard[6]], [], [], [], [], [], [], [...gameboard[13]]];
};

function reset() {
    gameboard = [
        ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], [],
        ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], []
    ];
    turn = 1;
    points1 = 0;
    point1Els.textContent = '0';
    points2 = 0;
    point2Els.textContent = '0';
    render();
};