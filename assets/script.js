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
    question: "Pokemon Go' was released for smartphones in which year?",
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
    choices: "Dots",
    b: "Comma",
    c: "Semicolon",
    d: "Question mark",
    answer: 0
  },
  {
    question: "Complete this classic game title 'World of ____'?",
    a: "Pizza",
    b: "Bicycle",
    c: "Doritos",
    d: "Warcraft",
    answer: "Warcraft"
  },
  // {
  //   question: "The character 'Bowser' is the primary antagonist of what series?",
  //   a:,
  //   b:,
  //   c:,
  //   d:,
  //   answer:
  // },
];

let mainElement = document.querySelector('main');
let startButton = document.querySelector('#start-btn');
let timerElement = document.querySelector('#timer');

let interval;
let time = 100;
let questionIndex = 0;
let lastQuestionCorrect = '';



function displayQuestion(){
  mainElement.innerHTML = "";

  if(questionIndex >= questions.length){
    endGame();
    return;
  }

  let h1El = document.createElement('h1');
  h1El.textContent = quizzes[questionIndex].question;
  mainElement.appendChild(h1El);

  let btnDivEl = document.createElement("div");
  mainElement.appendChild(btnDivEl);

  let pEl = document.createElement("p");
  pEl.textContent = lastQuestionCorrect;
  mainElement.appendChild(pEl);

  btnDivEl.addEventListener("click", function(event){
    let target = event.target;
    if (target.getAttribute("class") !== 'btn') return;

    let clickedQuestionIndex = parseInt(target.getAttribute("data-index"));

    if (clickedQuestionIndex === quizzes[questionIndex].answer){
      lastQuestionCorrect = "Correct";
    }else{
      time -= 10;
      lastQuestionCorrect = "Incorrect";
    }
  })

  for(let i = 0; i < quizzes[questionIndex].choices.length; i++){
    let buttonEl = document.createElement('button');
    buttonEl.textContent = quizzes[questionIndex].choices[i];
    buttonEl.setAttribute("class", "btn");
    buttonEl.setAttribute("data-index", i);
    mainElement.appendChild(buttonEl);
  }
}

startButton.addEventListener("click", function(event){
  mainElement.innerHTML = "";

  interval = setInterval(function(){
    time--;
    timerElement.textContent = `Time: ${time}`;

    if (time <= 0){
      clearInterval(interval);
      endGame();
      return;
    }
  }, 1000)

  questionIndex++;
  displayQuestion();
})

function endGame(){
  clearInterval(interval);
}