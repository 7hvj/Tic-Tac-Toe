const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restbtn=document.querySelector("#restbtn");
const winCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options= ["","","","","","","","",""];
let currentplayer="X";
let running=false;
intiGame();

function intiGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restbtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentplayer}'s turn`;
    running=true;

}
function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    if(options[cellIndex]!=""||!running){
        return;
    }
    updateCell(this,cellIndex);
    checkwin();

}
function updateCell(cell,index){
    options[index]=currentplayer;
    cell.textContent=currentplayer;
}
function changePlayer(){
    currentplayer=(currentplayer=="X")?"O":"X"
    statusText.textContent=`${currentplayer}'s turn`;

}
function checkwin(){
    let roundwin=false;
    for(let i=0; i<winCondition.length;i++){
        const condition=winCondition[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];
        if(cellA==""||cellB==""||cellC==""){
            continue;

        }
        if(cellA==cellB && cellB==cellC){
            roundwin=true;
            break;
        }
    }

    if(roundwin){
        statusText.textContent=`${currentplayer} win!`;
        running=false;
    }
    else if(!options.includes("")){
        statusText.textContent=`Drow!`;
        running=false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentplayer="X";
    options= ["","","","","","","","",""];
    statusText.textContent=`${currentplayer}'s turn`;
    cells.forEach(cell=>cell.textContent="");
    running=true;
}
