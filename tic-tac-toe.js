const cells = document.querySelectorAll(".box");
const statusText = document.querySelector("#gamestatus");
const statusText2 = document.querySelector("#gameover");
const restartBtn = document.querySelector("#restartBtn");
const newGameBtn = document.querySelector("#restartbtn");
const resultbox =  document.querySelector(".resultContainer");
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let playing = false;
resultbox.style.display = "none";
initializeGame();
function initializeGame(){
    cells.forEach(box => box.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    newGameBtn.addEventListener("click", restartGame);
    playing = true;
    statusText.textContent = `Player ${currentPlayer}'s turn `;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !playing ){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(box, index){
    options[index] = currentPlayer;
    box.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn `;
}

function checkWinner(){
    let roundWon = false;

    for (i=0; i< winConditions.length; i++){
        let conditions = winConditions[i];
        let box1 = options[conditions[0]];
        let box2 = options[conditions[1]];
        let box3 = options[conditions[2]];

        if (box1 == "" || box2 == "" || box3 == ""){
            continue;
        }

        if (box1 === box2 && box2 === box3){
            roundWon = true;
            break;
        }


    }

    if (roundWon){
        statusText2.textContent = `Player ${currentPlayer}'s Win `;
        resultbox.style.display = "block";
        statusText.textContent = "";
        restartBtn.textContent = "";
        playing = false;

    } else if (!options.includes("")){
        statusText2.textContent = `draw new game!`;
        resultbox.style.display = "block";
        statusText.textContent ="";
        restartBtn.textContent = "";
        playing = false;

    }
    else{
        changePlayer();
    }
}

function restartGame(){
    cells.forEach(box => box.textContent = "");
    options = ["","","","","","","","",""];
    currentPlayer = "X";
    playing = true;
    statusText.textContent = `Player ${currentPlayer}'s turn `;
    restartBtn.textContent = "Restart";
    resultbox.style.display = "none";
}
