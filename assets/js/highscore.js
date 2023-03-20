let resetButton = document.querySelector('#reset-btn');
let mainElement = document.querySelector('main');
let scoreElement = document.querySelector("#score");
let scoreList = document.getElementById("high-score");

resetButton.addEventListener("click", function(event){
  localStorage.removeItem("highScore");
  scoreList.innerHTML = "";
  var clearMessage = document.createElement("h2");
  clearMessage.textContent = "Local storage has been cleared!"
  clearMessage.setAttribute("style", "color: white");
  scoreElement.appendChild(clearMessage);
  resetButton.disabled = true;
})

function getHighScore(){
  let highScore = JSON.parse(localStorage.getItem("highScore")) || [];
  highScore.forEach(function (item){
    let playerScore = document.createElement("li");
    playerScore.textContent = " " + item.names + "  |  " + item.score + " points ";
    scoreList.appendChild(playerScore);
  });
}

getHighScore();

