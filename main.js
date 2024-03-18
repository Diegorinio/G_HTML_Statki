let width=7;
let height=7;
var gridMap = [];
let board = document.getElementById("game_box");

function generateBoard(){
for(var y=height;y>0;y--){
    let cell=[]
    for(let x=1;x<=width;x++){
        let box = document.createElement('div');
        box.setAttribute('class','box_item');
        box.setAttribute('posX',x);
        box.setAttribute('posY',y);
        box.setAttribute('isTaken',"false");
        board.appendChild(box);
        cell.push(box)
    }
    gridMap.push(cell);
}
}

const figs = {
    box:{width:2,height:2,image:"box"},
    line:{width:1,height:4,image:"line"}
}



//dodaj listener
for(let x=0;x<gridMap.length;x++){
    for(let y=0;y<gridMap.length;y++){
        gridMap[x][y].addEventListener('click',(e)=>{
            console.log(e.target);
        })
    }
}


generateBoard();
spawnFigAtRandomPostion(figs.box);
function spawnFigAtRandomPostion(fig){
    let x = Math.floor(Math.random()*6);
    let y = Math.floor(Math.random()*6);
    console.log(`${x},${y}`);


    //X i Y sa zgubione XD
    const boardFigs = [];
    console.log(x+fig.width);
    if(x>=0 && x+fig.width<=gridMap.length){
        for(let posX=x;posX<x+fig.width;posX++){
            gridMap[posX][y].setAttribute('isTaken',"true");
            gridMap[posX][y].innerHTML=fig.image;

        }
    }
}
 