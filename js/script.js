//game focus for speed change
 let gamefocus =true;


 //snake , food and setdirection variable;
let setdirection = {x:0, y:0};
let snake =[{x:3,y:2}];
let food ={x:4, y:10};



//score and high score
let score =0;
const scr=document.getElementById("score");
const hiscr=document.getElementById("hiscore");
scr.innerHTML ="Score : " + 0 ;
hiscr.innerHTML ="HIGH SCORE : " + 0 ;



const board=document.getElementById("container");

//speed and render
let lastrender =0;
//snake change speed
let snakespeed = 3;
// let speedselectfocus = false;
const selectvalue = document.querySelector("#speed select");  
selectvalue.addEventListener("change", ()=>{
    // let selectedtext =  selectvalue.options[selectvalue.selectedIndex].text;
    if(!gamefocus){
        snakespeed =  selectvalue.options[selectvalue.selectedIndex].value;
    } 
});

selectvalue.addEventListener("focus",(e) => {
  gamefocus=false;
}); 

selectvalue.addEventListener("blur",(e)=>{
    gamefocus=true;
});


//sounds variable
const foodsound = new Audio('./food.mp3'); 
const gameover = new Audio('./gameover.mp3'); 
const move = new Audio('./move.mp3'); 
const music = new Audio('./music.mp3'); 






function main(currenTime){
    
    /// gameloop is required to render 
    window.requestAnimationFrame(main); 
    if((currenTime-lastrender)/1000 < 1/snakespeed){
        return;
    } 
    lastrender=currenTime;
//  console.log(lastrender);
gamestart();

}






function gamestart(){ 
// music.play();
//updating the snake array
//if snake collide 
if(iscolide(snake)){
    score=0;
    music.pause();
    gameover.play();
    alert("game over!");
    setdirection ={x:0, y:0};
    snake=[{x:13,y:15}]; 
    music.play();
    scr.innerHTML="Score : 0"
}
//if the food is eaten
 

if(snake[0].y === food.y  && snake[0].x===food.x){
    snake.unshift({x: snake[0].x + setdirection.x, y:snake[0].y + setdirection.y });
    foodsound.play();
    score += 1;
    scr.innerHTML ="Score : "+ score ;


   if(score>highscorevar){
    highscorevar=score;
    localStorage.setItem('highscore',JSON.stringify(highscorevar));
    hiscr.innerHTML="HIGH SCORE :" + highscorevar;
} 

 let max = 50;
 let min =2;
food={x:Math.floor(Math.random() * (max - min) ) + min, y:Math.floor(Math.random() * (max - min) ) + min};
}


//moving snake parts


for (let i=snake.length-2; i>=0; i--) {
snake[i+1]= {...snake[i]};

}

//adding setdirections

snake[0].x += setdirection.x;
snake[0].y += setdirection.y;


//render snake

board.innerHTML=" ";
snake.forEach((e,index)=>{
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
  
    if(index===0){
        snakeElement.classList.add('head');
    } else{
        snakeElement.classList.add('bodysnake');
    }

    board.appendChild(snakeElement);
});

//food render
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
 

}
//game loop ends here



// hiscore varible in the local storage 
 
let highscore = localStorage.getItem("highscore");
if(highscore===null){
  highscorevar = 0 ;
  localStorage.setItem("highscore",highscorevar);
}
else{
    highscorevar=JSON.parse(highscore);
    hiscr.innerHTML = "HIGH SCORE : " + highscorevar;
}








// game main logic
  

window.requestAnimationFrame(main);



//if snake collides

function iscolide(snakearray){
//if colide with snake itself
for (let i = 1; i < snakearray.length; i++) {
    if(snakearray[0].x === snakearray[i].x && snakearray[0].y === snakearray[i].y){
return true;
    }   
}
// if snake colide with the wall
if(snakearray[0].x<=0 ||snakearray[0].x>=60 || snakearray[0].y<=0 || snakearray[0].y>=60 ){
    return true;
}
 


}











//setdirection 




addEventListener('keydown', e =>{
    setdirection = {x:0, y:0};
    move.play();
    if(gamefocus){
   switch (e.key) {
    case "ArrowUp":
        console.log("up");
        setdirection.x = 0;
        setdirection.y = -1;

            break;

    case "ArrowDown":
        console.log("Down");
        setdirection.x = 0;
        setdirection.y = 1;
            break;
   
     case "ArrowLeft":
            console.log("left");
            setdirection.x = -1;
            setdirection.y = 0;
            break;
   
     case "ArrowRight":
          console.log("right");
          setdirection.x = 1;
          setdirection.y =0;
            break;  
    default:
        break;
   }
    }
});

 const up =document.getElementById("up");
 const left =document.getElementById("left");
 const right =document.getElementById("right");
 const down =document.getElementById("down");



 up.addEventListener("click",()=>{
    setdirection.x = 0;
    setdirection.y = -1;
 });


 down.addEventListener("click",()=>{
    setdirection.x = 0;
    setdirection.y = 1;
 });


 left.addEventListener("click",()=>{
    setdirection.x = -1;
    setdirection.y = 0;
 });
 right.addEventListener("click",()=>{
    setdirection.x = 1;
    setdirection.y =0;
 });