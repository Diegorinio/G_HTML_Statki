let width = 7;
let height = 7;
let gridMap = []; // mapa gry
let ships = []; // statki przeciwnika
let playerHits = 0; // trafienia pol przez gracza
let shotsFired = 0; // ogolna liczba strzalow
let shootCounterTxt = document.getElementById("shotsFired");

// Klasa statek 
class Ship {
    constructor(name,img,shape,posX,posY){
        this.name=name;
        this.img=img;
        this.shape=shape;
        this.posX=posX;
        this.posY=posY;
        this.isDestroyed = false;

        // tablica elementow gdzie sa trafienia
        this.hits=new Array(this.shape.length).fill(false).map(()=>new Array(this.shape[0].length).fill(false));

        // ilosc pol zajetych przez statek
        this.occupied=this.shape.reduce((a,b)=>a+b.reduce((x,y)=>x+y,0),0);
    }

    // metoda sprawdzajaca czy statek zostal trafiony
    checkIsDestroyed() {
        if (this.isDestroyed) {
            return true;
        }
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] && !this.hits[i][j]) {
                    return false;
                }
            }
        }
        this.isDestroyed = true;
        return true;
    }
}

// wygeneruj losowo statki
function generateShips() {
    const shipTypes = [
        { name:"Ship1",img:"tiktok",shape:[[true,true,true],[false,true,false]]},
        { name:"Ship2",img:"facebook",shape:[[true,false],[true,true],[true,false]]},
        { name:"Ship3",img:"twitter",shape:[[true, true],[true,true]]}
    ];

    for(let shipType of shipTypes){
        let shape=shipType.shape;
        let x,y;
        let isHitting=true;
        // sprawdzenie czy statki nie nachodza na siebie
        while (isHitting) {
            x=Math.floor(Math.random()*(width-shape[0].length+1));
            y=Math.floor(Math.random()*(height-shape.length+1));
            isHitting=false;
            for (let ship of ships) {
                if (checkIsHitting(x,y,shape,ship.posX,ship.posY,ship.shape)){
                    isHitting = true;
                    break;
                }
            }
        }

        let ship = new Ship(shipType.name, shipType.img, shape, x, y);
        ships.push(ship);
    }
}

// czy statki wchodza sobie na pola
function checkIsHitting(x1,y1,shape1,x2,y2,shape2) {
    for (let i=0;i<shape1.length;i++) {
        for (let j=0;j<shape1[i].length;j++) {
            if (shape1[i][j]) {
                for (let k=0;k<shape2.length;k++) {
                    for (let l=0;l<shape2[k].length;l++) {
                        if (shape2[k][l]&&x1+j===x2+l&&y1+i===y2+k){
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

// glowna funkcja generujaca plansze
function generateBoard() {
    let board = document.getElementById("game_box");

    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            let cell = document.createElement('div');
            cell.setAttribute('class', 'box_item');
            cell.setAttribute('posX', x);
            cell.setAttribute('posY', y);
            cell.addEventListener('click', onCellClick);
            board.appendChild(cell);
            row.push(cell);
        }
        gridMap.push(row);
    }
}

//czy statki sa zniszczone
function allShipsKilled() {
    for (let ship of ships) {
        if (!ship.isDestroyed) {
            return false;
        }
    }
    return true;
}

// funkcja klikniecia w pole
function onCellClick(event) {
    let posX=parseInt(event.target.getAttribute('posX'));
    let posY=parseInt(event.target.getAttribute('posY'));
    let hit=false;
    for (let ship of ships){
        for (let i=0;i<ship.shape.length; i++){
            for (let j=0;j< ship.shape[i].length;j++) {
                if (ship.shape[i][j]&&posX===ship.posX+j&&posY===ship.posY+i) {
                    hit = true;
                    console.log(ship);
                    event.target.innerHTML='<img src="imgs/'+ship.img+'.png" alt="Ship" height="100" width="100">';
                    ship.hits[i][j]=true;
                    if (ship.checkIsDestroyed()){
                        ship.isDestroyed=true;
                    }
                    break;
                }
            }
        }
        if(hit){
            break;
        }
    }

    if (hit){
        playerHits++;
        if (allShipsKilled()) {
            alert('Zniszczono wszystkie statki, ilosc strzalow: ' + shotsFired);
            let restartBtn =document.getElementById("resetBtn");
            restartBtn.style.display="block";
            restartBtn.addEventListener('click',()=>{StartUp()});
        }
    } else {
        event.target.innerHTML='<img src="imgs/miss.png" alt="Ship" height="100" width="100">';
    }

    shotsFired++;
    shootCounterTxt.innerHTML = shotsFired;
    event.target.removeEventListener('click', onCellClick);
}


function StartUp(){
    //wyczyszcznie planszy 
    ships = [];
    playerHits = 0;
    shotsFired = 0;
    shootCounterTxt.innerHTML = shotsFired;
    let board = document.getElementById("game_box");
    board.innerHTML = "";
    gridMap = [];
    generateBoard(); 
    generateShips();
}
window.onload = StartUp();