const gameInfo = document.querySelector(".game-info")
const boxs = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

initGame();
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    btn.classList.remove("active");
    boxs.forEach( (box,index)=> {
        box.innerHTML = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`
        // box.classList.remove("win");
    })
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
            if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            if(gameGrid[position[0]] === 'X'){
                answer = "X";
            }
            else{
                answer = "O";
            }
            boxs.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxs[position[0]].classList.add("win");
            boxs[position[1]].classList.add("win");
            boxs[position[2]].classList.add("win");
        }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        btn.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        gameInfo.innerText = `Game Draw !`;
        btn.classList.add("active");
        return;
    }

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxs[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        console.log(gameGrid);
        boxs[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
    }
}

boxs.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

btn.addEventListener('click', () => {
    initGame();
});