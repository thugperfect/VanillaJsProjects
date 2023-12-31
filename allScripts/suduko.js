const body = document.getElementById("body")
let selectedOption = null
let selectedBox = null
let mistake = 0

const mainBody = document.getElementById("mainBody")
const mistakeDiv = document.getElementById('mistake')
const suduko = [
    "2---1--78",
    "--8---4-9",
    "43-92--61",
    "1--6--984",
    "9---3-2-7",
    "--2--961-",
    "-7--8---6",
    "8--3--7-5",
    "649-5---2"
]
const sudukoAnswers = [
    "296415378",
    "518763429",
    "437928561",
    "153672984",
    "964831257",
    "782549613",
    "375284196",
    "821396745",
    "649157832"
]
window.onload = function (){
    const gameBox = document.createElement("div")
    const optBox = document.createElement("div")

    gameBox.classList.add("game-box")
    optBox.classList.add("option-box")
    gameBox.id ="game-box"
    optBox.id = "option-box"
    body.appendChild(gameBox)
    body.appendChild(optBox)
    optionContent()
    gameContent()
}

function gameContent(){
    const gameBoxDiv = document.getElementById('game-box')
    for(let i = 0;i<9;i++){
        for(let j = 0;j<9;j++){
            const tile = document.createElement("div")
            if(i === 2 || i === 5){
                tile.classList.add("border-bottom")
            }
            if(j === 2 || j === 5){
                tile.classList.add("border-right")
            }
            tile.classList.add("tile")
            if(suduko[i][j] === "-"){

            }else{
                tile.classList.add("bgray")
                tile.innerText = suduko[i][j]
            }
            tile.id = i +"-" +j
            gameBoxDiv.appendChild(tile)
            tile.addEventListener("click",setTile)
        }
    }
}
function setTile(){
    let countDash = 0
    let rowCol = this.id.split("-")
    let row = rowCol[0]
    let col = rowCol[1]
    if(selectedOption){
        if(this.innerText === "" && mistake<=5){
         if(sudukoAnswers[row][col] === selectedOption.id){
            suduko[row][col] = "1"
            this.innerText = selectedOption.id
            checkWin()
         }else{
            
            mistake+=1
            if(mistake<5){  
                mistakeDiv.innerText = mistake+"/5"
            }else{
                popup("You Lose")
            } 
         }
        }
       
    }else{
        alert("please select any number to place")
    }

    function checkWin(){
    
        const tileBox = document.getElementsByClassName("tile")
        for(i = 0 ;i <tileBox.length;i ++){
           if(tileBox[i].innerText === ""){
            countDash+=1
            console.log(countDash)
           }
        }
                if(countDash === 0){
                popup("You Win")
            }
    
    }
    
}

function optionContent(){
    const optBoxDiv  = document.getElementById("option-box")
    for( let i = 1;i<=9;i++){
        const optionBox = document.createElement("div")
        optionBox.innerHTML = i
        optionBox.id = i
        optionBox.classList.add('options')
        optBoxDiv.appendChild(optionBox)

        optionBox.addEventListener('click',selectedOptionFn)

    }
}

function selectedOptionFn (){
    if(selectedOption!=null){
        selectedOption.classList.remove("clicked-option-box")
    }
    selectedOption = this
    selectedOption.classList.add("clicked-option-box")
}

function popup(text){
    const popupDiv = document.createElement("div")
    const popupBox = document.createElement("div")
    const popupText = document.createElement("div")
    const reloadBtn = document.createElement("button")
    popupBox.classList.add("popup-box")
    popupDiv.classList.add("popup")
    popupText.classList.add("popup-text")
    popupText.innerText = text
    reloadBtn.innerText = "Play Again"
    
    popupBox.appendChild(reloadBtn)
    popupBox.appendChild(popupText)
    popupDiv.appendChild(popupBox)
    mainBody.appendChild(popupDiv)
    reloadBtn.onclick =()=> window.location.reload()

}

