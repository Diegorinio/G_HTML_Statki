let width=7;
let height=7;
var gridMap = [];
let board = document.getElementById("game_box");
for(var x=0;x<width;x++){
    let cell=[]
    for(let y=0;y<height;y++){
        let box = document.createElement('div');
        box.setAttribute('class','box_item');
        box.setAttribute('posX',x);
        box.setAttribute('posY',y);
        board.appendChild(box);
        cell.push(box)
    }
    gridMap.push(cell);
}
// console.log(document.querySelectorAll('.box_item')[0]);
console.log(gridMap[0][1])
 