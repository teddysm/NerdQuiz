let resetButton = document.querySelector('#reset-btn');
let mainElement = document.querySelector('main');
let scoreElement = document.querySelector("#score");

resetButton.addEventListener("click", function(event){
  // mainElement.innerHTML = "";
  localStorage.setItem("highScore", {});
})

function getHighScore(){
  let highScore = localStorage.getItem("highScore");
  let playerScore = document.createElement("h3");

  highScore.forEach(getLocal);
  function getLocal(item, index, arr){
    playerScore = JSON.parse(highScore[index]);
    scoreElement.appendChild(playerScore);
   };

  // localStorage.getItem("highScore");
  // localStorage.getItem("initials");
}

function renderHighScore(){
  
}