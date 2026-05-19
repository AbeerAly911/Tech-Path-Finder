
let startBtn = document.getElementById("startBtn");
let hero = document.getElementById("hero");
let quiz = document.getElementById("quiz");
let questionText = document.getElementById("question");

let currentQuestion = 0;
let selected = false;
let selectedType = null;

/* 🎯 6 QUESTIONS */
let questions = [
  {
    q: "What type of work excites you the most?",
    options: [
      { text: "Designing apps and visuals 🎨", type: "creative" },
      { text: "Solving logical problems 🧠", type: "logical" },
      { text: "Working with people 👥", type: "social" },
      { text: "Analyzing data 📊", type: "analytical" }
    ]
  },
  {
    q: "How do you usually solve problems?",
    options: [
      { text: "By using creativity 🎨", type: "creative" },
      { text: "By breaking them into steps 🧠", type: "logical" },
      { text: "By asking others 👥", type: "social" },
      { text: "By analyzing data 📊", type: "analytical" }
    ]
  },
  {
    q: "What sounds more interesting?",
    options: [
      { text: "UI Design 🎨", type: "creative" },
      { text: "Coding 🧠", type: "logical" },
      { text: "Team leadership 👥", type: "social" },
      { text: "Data analysis 📊", type: "analytical" }
    ]
  },
  {
    q: "What describes you best?",
    options: [
      { text: "Imaginative 🎨", type: "creative" },
      { text: "Logical thinker 🧠", type: "logical" },
      { text: "Communicator 👥", type: "social" },
      { text: "Detail oriented 📊", type: "analytical" }
    ]
  },
  {
    q: "What do you enjoy learning?",
    options: [
      { text: "Design tools 🎨", type: "creative" },
      { text: "Programming 🧠", type: "logical" },
      { text: "Communication 👥", type: "social" },
      { text: "Data insights 📊", type: "analytical" }
    ]
  },
  {
    q: "What role fits you best?",
    options: [
      { text: "UI/UX Designer 🎨", type: "creative" },
      { text: "Software Engineer 🧠", type: "logical" },
      { text: "Product Manager 👥", type: "social" },
      { text: "Data Analyst 📊", type: "analytical" }
    ]
  }
];

/* SCORES */
let scores = {
  creative: 0,
  logical: 0,
  social: 0,
  analytical: 0
};

/* SHUFFLE */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* START */
startBtn.addEventListener("click", function () {
  hero.style.display = "none";
  quiz.style.display = "block";

  questions = shuffle(questions);

  loadQuestion();
});

/* LOAD QUESTION */
function loadQuestion() {
  selected = false;

  let q = questions[currentQuestion];
  questionText.innerText = q.q;

  let container = document.querySelector(".options");
  container.innerHTML = "";

  let shuffledOptions = shuffle([...q.options]);

  shuffledOptions.forEach(opt => {
    let btn = document.createElement("button");
    btn.classList.add("option");

    btn.innerText = opt.text;

    btn.onclick = function () {
      selectAnswer(opt.type, btn);
    };

    container.appendChild(btn);
  });
}

/* SELECT ANSWER */
function selectAnswer(type, btn) {
  selected = true;
  selectedType = type;

  document.querySelectorAll(".option").forEach(b => {
    b.classList.remove("selected");
  });

  btn.classList.add("selected");
}

/* NEXT */
function nextQuestion() {
  if (!selected) {
    alert("اختاري إجابة 👀");
    return;
  }

  scores[selectedType]++;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

/* RESULT */
function showResult() {
  quiz.style.display = "none";

  hero.innerHTML = `
    <h1>✨ Your Tech Path</h1>
    <h2>${getResult()}</h2>
    <button onclick="location.reload()">Try Again 🔁</button>
  `;

  hero.style.display = "flex";
}

/* RESULT LOGIC */
function getResult() {
  let max = "creative";
  let maxScore = 0;

  for (let key in scores) {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      max = key;
    }
  }

  if (max === "creative") return "Frontend / UI-UX 🎨";
  if (max === "logical") return "Software Engineer 🧠";
  if (max === "social") return "Product Manager 👥";
  return "Data Analyst 📊";
}