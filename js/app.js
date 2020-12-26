

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const upKey = 38;
const downKey = 40;
const leftKey = 37;
const rightKey = 39;
const gmScore = document.getElementById('Curent');
const gmLast = document.getElementById('Last');
let activate = false
let active = false
let move = false
let gameOver = true
let lasers = []
let play = true;


const crMap=()=>{
        ctx.clearRect(0,0,canvas.width, canvas.height)
    }




////////////FRUIT
const fruit={
        local:{x:30,y:40},
        points: 10,
        scale:10,
    
    drawFruit(){   
        let sc = this.scale   
        ctx.fillStyle ="red";/// redraws fruit
        ctx.fillRect(this.local.x,this.local.y,sc,sc )
        },
    randCord(){             //random cordinates for the fruit
        let xCords = 0
        let yCords = 0
        while(true){
            xCords = Math.floor(Math.random() * canvas.width)
          if (xCords % 10 === 0){
            break;
            }
        }
        while(true){
            yCords = Math.floor(Math.random() * canvas.height)
            if (yCords % 10 === 0){
            break;
            }
        }
        this.local.x = xCords
        this.local.y = yCords
        },
}



////////////////////////////  Snake
const snake = {
    head:{x:null, y:null},
    Speed: 10,
    scale:10,
    trail:[{x: 80, y: 70}],
    old:[],
    end:{x:null, y:null},
    score:0,
    ready: false,
    drawSnake() {
        let sc = this.scale
        let len = this.trail.length
        for (let i = 0; i < len; i++){
            if(i != 0){
            ctx.fillStyle = "green";
            ctx.fillRect(this.trail[i].x, this.trail[i].y, sc, sc)
            }else{
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.trail[i].x, this.trail[i].y, sc, sc)
            }
        }
    },
    moveSnake(key){
        this.makeTrail()

        let sc = this.scale; 
            if (key == upKey){
                // console.log(this.trail[0])
                this.trail[0].y -= sc
                // console.log(this.trail[0])
            } else if (key== downKey ){
                // console.log(this.trail[0])
                this.trail[0].y += sc
            } else if (key== leftKey){
                // console.log(this.trail[0])
                this.trail[0].x -= sc
            } else if (key== rightKey){
                // console.log(this.trail[0])
                this.trail[0].x += sc
            }
            this.collision()

        },
        
    makeTrail(){
        let body = {x:null, y:null}
        body.x = this.head.x;
        body.y = this.head.y
        this.trail.unshift(body)
        // console.log(this.trail[0])

    },
    getTrail(){
        let len = this.trail.length
        let last = len - 1
        this.head.x = this.trail[0].x;  this.head.y = this.trail[0].y; 
        this.end.x = this.trail[last].x;  this.end.y = this.trail[last].y; 
        // console.log(this.old)
    },
    collision(){
        if(this.trail[0].x == fruit.local.x && this.trail[0].y == fruit.local.y ){
            snake.score +=1
            if (this.trail.score === 1 || 5 || 8|| 10 || 15 ){
                this.ready = true
            }
            fruit.randCord()
        }else{
            this.trail.pop()
        }

    },
    blastCollison(block){
        this.trail.splice(block, this.trail.length)
    },
    randCord(){             //random cordinates for the fruit
        let xCords = 0
        let yCords = 0
        while(true){
            xCords = Math.floor(Math.random() * (canvas.width - 20))
          if (xCords % 10 === 0){
            break;
            }
        }
        while(true){
            yCords = Math.floor(Math.random() * (canvas.height - 20))
            if (yCords % 10 === 0){
            break;
            }
        }
        this.trail[0].x = xCords
        this.trail[0].y = yCords
        },

}



////////////////////////////  LASER
class Lasers {
    constructor(){
        this.local={x: 0, y: 0,},
        this.wall= null,
        this.side= null
    }
    draw(){
        let x , y ;
        x = this.local.x;
        y = this.local.y;
        if(this.wall == 0){


            ctx.strokeStyle = "blue";
            ctx.strokeRect(x, y, 10, 5)

            ctx.fillStyle = "black";
            ctx.fillRect(x -1, y +6, 12, 5)
    
            ctx.fillStyle = "black";
            ctx.fillRect(x - 1, y -1, 12, 5)

        }else if(this.wall == 1){


            ctx.strokeStyle = "blue";
            ctx.strokeRect(x, y, 5, 10)

            ctx.fillStyle = "black";
            ctx.fillRect(x +6, y -1, 5, 12)

            ctx.fillStyle = "black";
            ctx.fillRect(x - 1, y -1, 5, 12)

        }
    }
    startLocal(){
        this.local.x = 0
        this.local.y = 0
        let cord = 0
        this.side = Math.floor(Math.random() * 4)

        // Top of the grid
        while(this.side === 0?true:false){
            this.wall = 1
        cord = Math.floor(Math.random() * canvas.width)
            if (cord % 10 === 0){
                this.local.x = cord
            break;
            }
        }

        while(this.side === 1?true:false){
            this.wall = 0
            cord = Math.floor(Math.random() * canvas.height)
                if (cord % 10 === 0){
                    this.local.y = cord
                break;
                }
            }

        while(this.side === 2?true:false){
            this.wall = 1
            cord = Math.floor(Math.random() * canvas.width)
                if (cord % 10 === 0){
                    this.local.x = cord
                    this.local.y =140
                break;
                }
            }
        while(this.side === 3?true:false){
            this.wall = 0
            cord = Math.floor(Math.random() * canvas.height)
                if (cord % 10 === 0){
                    this.local.x = 290
                    this.local.y = cord
                break;
                }
            }

        
        // console.log(this.side, this.local)

    }
    moveLazer(){
        if(this.side === 0 && this.local.y != 150){
            this.local.y += 10
        }else if(this.side === 0 && this.local.y === 150) {
                this.startLocal()
        }

        if(this.side === 1 && this.local.x != 300){
            this.local.x += 10
        }else if(this.side === 1 && this.local.x === 300) {
            this.startLocal()
        }

        if(this.side === 2 && this.local.y != 0){
            this.local.y -= 10
        }else if(this.side === 2 && this.local.y === 0) {
            this.startLocal()
        }

        if(this.side === 3 && this.local.x != 0){
            this.local.x -= 10
        }else if(this.side === 3 && this.local.x === 0) {
            this.startLocal()
        }

        
    }

}

////////////////////////////  Avtivate lazer depending on score
activeLazers=()=>{
    if (activate){
            let blast =  new Lasers()
            blast.startLocal()
            lasers.push(blast)
            // console.log(lasers)
        activate = false
        move = true
        active = true

    }

    if(active){
        lasers.forEach(blast=>{
            blast.draw()
        })
    }

    

}


////////////////////////////  Game 
const SnakeGame =()=>{
    snake.getTrail()
    snake.drawSnake()
    if (snake.score == 1 && snake.ready){
        activate = true
        snake.ready = false
    }
    if (snake.score == 5 && snake.ready){
        activate = true
        snake.ready = false
    }
    if (snake.score == 8 && snake.ready){
        activate = true
        snake.ready = false
    }
    if (snake.score == 10 && snake.ready){
        activate = true
        snake.ready = false
    }
    if (snake.score == 15 && snake.ready){
        activate = true
        snake.ready = false
    }

}

const collision =()=>{

    lasers.forEach(blast=>{
        if(blast.local.x == snake.trail[0].x && blast.local.y == snake.trail[0].y ){
            play = false;
            move = false;
            blast.moveLazer()
            // active = false
        }else{
            for(let i=1; i< snake.trail.length;i++){
                if(blast.local.x == snake.trail[i].x && blast.local.y == snake.trail[i].y ){
                    // console.log("collision")
                    snake.blastCollison(i)
                    blast.moveLazer()
                    break;
                    // active = false
                }
            }
        }
    })


    if (snake.trail[0].x == -10 ){
        play = false;
        move = false;
    }
    if(snake.trail[0].y == -10){
        move = false;
        play = false;
    }
    if (snake.trail[0].x == 300){
        move = false;
        play = false;
    }
    if(snake.trail[0].y == 150){
        move = false;
        play = false;
    }

}



////////////////////////////  Makes the grid
const makeGrid=()=> {

    ctx.strokeStyle = "white";

    for(let i = 0; i <= canvas.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke()
    }
    for(let i = 0; i <= canvas.height; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
}

const direction=(event)=>{
    let key;
    play?
    key = event.keyCode:false;


    if (key == upKey|| key== rightKey || key== leftKey || key== downKey){
        snake.moveSnake(key)
    }

}



const gameOverAlert=()=>{
    if(gameOver){
        ctx.fillStyle = "#4A9541";
        ctx.fillRect(75,37, 150, 75)

        ctx.fillStyle = "white";
        ctx.font = '30px serif';
        ctx.fillText('Game Over', 78, 75)
        ctx.font = '15px serif';
        ctx.fillText('Click play Again Below', 78, 90)
        ctx.font = '15px serif';
        ctx.fillText(`Score: ${snake.score * snake.trail.length}`, 120, 110)

        const handleClick=()=>{
            window.location.reload()
        }
        const playBttn = document.createElement("button")
        const playText = document.createElement("p")
        playBttn.classList.add("playbttn")
        playBttn.addEventListener('click', handleClick ) 


        playText.innerHTML= "Play Again"
        playBttn.appendChild(playText)

        const playAgain = document.querySelector("div.PlayAgain")
        playAgain.appendChild(playBttn)

        gameOver = false
    }
}



document.addEventListener('keydown',direction)
fruit.randCord()
snake.randCord()

const render=()=>{
gmScore.innerHTML = `${snake.score}`
gmLast.innerHTML = `${snake.score * snake.trail.length}`
collision()
crMap()
makeGrid() /// gives it a white grid
SnakeGame()
fruit.drawFruit()
activeLazers()
}




setInterval(function(){play?render():gameOverAlert()}, 100)       //// Willl render the game
setInterval(function(){play?fruit.randCord():false}, 8000)       //// Willl render the game
setInterval(function(){move?lasers.forEach(move=>{move.moveLazer()}):false}, 200)       //// Willl render the game



































