let mainElement = document.querySelector('main');
let startButton = document.querySelector('#start-btn');
let timerElement = document.querySelector('#timer');


let storedArray = [];
let interval;
let time = 100;
let quizIndex = 0;
let lastQuestionCorrect = '';



let quizzes = [
  {
    question: "How many Grand Theft Auto games have been released?",
    choices: [14, 15, 16, 17],
    answer: 1
  },
  {
    question: "The character 'Bowser' is the primary antagonist of what series?",
    choices: ["Mario", "God of War", "Call of Duty", "League of Legends"],
    answer: 0
  },
  {
    question: "Sonic the Hedgehog was which of these colors?",
    choices: ["Orange", "Pink", "Blue", "Purple"],
    answer: 2,
  },
  {
    question: "From where was the Prince in classic video game 'Prince of …'?",
    choices: ["Thailand", "China", "Iran", "Persia"],
    answer: 3
  },
  {
    question: "Pokemon Go was released for smartphones in which year?",
    choices: [2015, 2016, 2017, 2018],
    answer: 1
  },
  {
    question: "Which developer produces the Starcraft, Hearthstone and Overwatch games?",
    choices: ["Blizzard", "Snowstorm", "Whiteout", "Tempest"],
    answer: 0
  },
  {
    question: "Which Pokemon can eventually evolve into an Alakazam?",
    choices: ["Pikachu", "Haunter", "Zapdos", "Abra"],
    answer: 3
  },
  {
    question: "The main goal of Pacman is to eat all of which type of symbol?",
    choices: ["Dots", "Comma", "Semicolon", "Question mark"],
    answer: 0
  },
  {
    question: "Complete this classic game title 'World of ____'?",
    choices: ["Pizza", "Bicycle", "Doritos", "Warcraft"],
    answer: 3
  },
  {
    question: "What is the name of the hero of 'The Legend of Zelda'?",
    choices:["Zelda", "Link", "Navi", "Ganon"],
    answer: 1
  },
  {
    question:   "The PlayStation console is produced by which company?",
    choices:["Sony", "Apple", "Google", "Activision"],
    answer: 0
  },
  {
    question:   "San Andreas is a fictional US state in which game series?",
    choices:["Counter Strike", "Call of Duty", "Grand Theft Auto", "Sonic"],
    answer: 2
  },
];


function displayQuestion(){
  mainElement.innerHTML = "";

  if(quizIndex >= quizzes.length){
    endGame();
    return;
  }

  let questionDiv = document.createElement("div");
  questionDiv.setAttribute("style", "height: 110px");

  let questions = document.createElement("h1");
  questions.textContent = quizzes[quizIndex].question;
  questionDiv.appendChild(questions);
  mainElement.appendChild(questionDiv);


  let answers = document.createElement("div");
  answers.setAttribute("class", "btn-container");
  mainElement.appendChild(answers);

  let correct = document.createElement("p");
  correct.textContent = lastQuestionCorrect;
  mainElement.appendChild(correct);

  for(let i = 0; i < quizzes[quizIndex].choices.length; i++){
    let buttonEl = document.createElement('button');
    buttonEl.textContent = quizzes[quizIndex].choices[i];
    buttonEl.setAttribute("class", "btn answer-btn");
    buttonEl.setAttribute("data-index", i);
    answers.appendChild(buttonEl);
  }

  answers.addEventListener("click", function(event){
    let target = event.target;
    if (target.getAttribute("class") !== 'btn answer-btn') return;

    let clickedQuizIndex = parseInt(target.getAttribute("data-index"));

    if (clickedQuizIndex === quizzes[quizIndex].answer){
      mainElement.style.backgroundColor = 'green';
      setTimeout(function(){
        mainElement.style.backgroundColor = 'lightblue';
      }, 250)
      quizIndex++;
      displayQuestion();
    }else{
      time -= 10;
      timerElement.textContent = `Time left: ${time}`;
      mainElement.style.backgroundColor = 'red';
      setTimeout(function(){
        mainElement.style.backgroundColor = 'lightblue';
      }, 250)
      quizIndex++;
      displayQuestion();
    }
  })

}

startButton.addEventListener("click", function(event){
  mainElement.innerHTML = "";

  interval = setInterval(function(){
    time--;
    timerElement.textContent = `Time left: ${time}`;

    if (time <= 0){
      clearInterval(interval);
      endGame();
      return;
    }
  }, 1000)

  displayQuestion();
})


function endGame(){
  clearInterval(interval);
  mainElement.innerHTML = "";
  let endMessage = document.createElement("h1");
  endMessage.textContent = "Thank you for playing <3";
  mainElement.appendChild(endMessage);

  let currentScore = document.createElement("h4");
  currentScore.textContent = "Your score is: " + time;
  mainElement.appendChild(currentScore);

  const divEl = document.createElement('div');
  divEl.innerHTML = 
  `
    <form id="user-initials" class="">
      <label for="initials">Your initials:</label><br>
      <input type="text" id="initials" name="initials" placeholder="TD"><br><br>
      <button type="submit" class="btn" id="formButton" value="Submit" formaction='highscore.html'>Submit</button>
    </form> 
  `
  mainElement.appendChild(divEl);

  let button = document.querySelector('#formButton')
  button.addEventListener("click", function() {
    setHighScore();
  })
  return;
}


function setHighScore(){
  let formInput = document.querySelector('#initials').value;

  console.log(formInput)
  let storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null && storedScore.length > 0){
    storedArray = storedScore;
  }

  let highScoreObj = {
    score: time,
    names: formInput
  };
  storedArray.push(highScoreObj);

  console.log(storedArray)

  localStorage.setItem("highScore", JSON.stringify(storedArray));
}