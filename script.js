let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let countSteps = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    countSteps = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#564D80";
            turnO = true;
        }
        box.disabled = true;
        countSteps++;
        box.style.backgroundColor = "#FFFFC7";

        let isWinner = checkWinner();

        if(countSteps === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Oops!, Game was a Draw.`
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
        box.style.backgroundColor = "#FFFFC7";
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
        box.style.color = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congrtulations!, Winner is Player ${winner}.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(ptn of winPatterns) {
        let pos1Val = boxes[ptn[0]].innerText;
        let pos2Val = boxes[ptn[1]].innerText;
        let pos3Val = boxes[ptn[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
