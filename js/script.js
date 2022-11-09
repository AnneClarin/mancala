console.log('connected!')
/*----- constants -----*/
const players = {
    '1': 'Player 1',
    '-1': 'Player 2'
}
let gameboard = [
    ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], [],
    ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], []
]
let adjacent = [[0, 12], [1, 11], [2, 10], [3, 9], [4, 8], [5, 7]]
/*----- app's state (variables) -----*/
let points1 = 0;
let points2 = 0;
let turn = 1;
/*----- cached element references -----*/
let pitEls = document.querySelectorAll('.pit');
let textEl  = document.querySelector('h2');
let point1Els = document.querySelector('.player1'); 
let point2Els = document.querySelector('.player2');
// let resetBtnEl = document.querySelector('button');
/*----- event listeners -----*/
document.querySelector('.gameboard').addEventListener('click', handleChoice);
document.querySelector('button').addEventListener('click', reset);
/*----- functions -----*/
render()

function handleChoice(evt) {
    if (evt.target.id && evt.target.id !== 'p6' && evt.target.id !== 'p13') {
        let num = parseInt(evt.target.id.slice(1))
        // save all gameboard pieces to be moved
        let gameboardPieces = [...gameboard[num]]
        // save the original clicked pit index
        let clickedNum = num 
        if (gameboard[clickedNum].length && ((turn === -1 && clickedNum > 6) || (turn === 1 && clickedNum < 6))) {
            // while loop iterator index
            let idx = 0 
            while (idx < gameboardPieces.length) { 
                // grab last element of original clicked pit
                let endPiece = gameboard[clickedNum].pop() 
                num++
                idx++
                if (num == 14) num = 0 
                // push endpiece into next available pit
                gameboard[num].push(endPiece) 
            }
            if (clickedNum + gameboardPieces.length <= 13) {
                let targetNum = clickedNum + gameboardPieces.length
                steal(gameboardPieces[0], targetNum)
                console.log(gameboard)
            } else {
                let targetNum = clickedNum + gameboardPieces.length
                targetNum = targetNum - 14
                console.log(gameboard)
                steal(gameboardPieces[0], targetNum)
            }
            turn *= -1;
            gameboard[clickedNum] = [];
            render()
        }
    }
}


function steal(lastPiece, targetNum) {
    if (gameboard[targetNum].length == 1 && gameboard[targetNum][0] == lastPiece) {
        if (turn == 1) {
         gameboard[6].push(lastPiece)
        } else {
         gameboard[13].push(lastPiece)
        }
        gameboard[targetNum] = []
        adjacent.forEach(subArr => {
            if (subArr[0] == targetNum) {
                if (turn == 1) {
                    gameboard[6] = [...gameboard[6], gameboard[subArr[1]]].flat(Infinity)

                } else {
                    gameboard[13] = [...gameboard[13], gameboard[subArr[1]]].flat(Infinity)
                }
                gameboard[subArr[1]] = []
            } else if (subArr[1] == targetNum) {
                if (turn == 1) {
                    gameboard[6] = [...gameboard[6], gameboard[subArr[0]]].flat(Infinity)
                } else {
                    gameboard[13] = [...gameboard[13], gameboard[subArr[0]]].flat(Infinity)
                }
                gameboard[subArr[0]] =[]
            }
        }) 
    }
}    
        
        
function render() {
    textEl.innerHTML = `${players[turn]}'s Turn`;
    pitEls.forEach(pit => {
        pit.innerHTML = ""
        let idx = parseInt(pit.id.substring(1,3))
        gameboard[idx].forEach(elem => {
            if (elem == "r1") { 
                let divEl = document.createElement('div')
                divEl.style.width = "15px";
                divEl.style.height = "15px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "red";
                divEl.style.boxShadow = "2px 2px #8B0000";
                pit.appendChild(divEl)
            } else  if (elem == "b1") { 
                let divEl = document.createElement('div')
                divEl.style.width = "15px";
                divEl.style.height = "15px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "blue";
                divEl.style.boxShadow = "2px 2px #152238";
                pit.appendChild(divEl)
            }  else if (elem == "g1") { 
                let divEl = document.createElement('div')
                divEl.style.width = "15px";
                divEl.style.height = "15px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "green";
                divEl.style.boxShadow = "2px 2px #023020";
                pit.appendChild(divEl)
            }  else if (elem == "y1") { 
                let divEl = document.createElement('div')
                divEl.style.width = "15px";
                divEl.style.height = "15px";
                divEl.style.borderRadius = "50%";
                divEl.style.backgroundColor = "yellow";
                divEl.style.boxShadow = "2px 2px #8B8000";
                pit.appendChild(divEl)
            }
        });
    });
    points();
};

function points() {
    points1 = gameboard[6].length;
    point1Els.textContent =  `${points1}`
    points2 = gameboard[13].length;
    point2Els.textContent =  `${points2}`
};

function reset() {
    gameboard = [
        ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], [],
        ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], ['r1', 'b1', 'g1', 'y1'], []
    ]
    turn = 1
    points1 = 0
    point1Els.textContent = '0'
    points2 = 0
    point2Els.textContent = '0'
    render()
}