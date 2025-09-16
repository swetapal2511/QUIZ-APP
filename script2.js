const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style System", "Colorful Style Sheets"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter"
  },
  {
    question: "Who developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
    correct: "Sun Microsystems"
  }
];

const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  quizContainer.innerHTML = "";
  resultDiv.innerHTML = "";

  const q = quizData[currentQuestion];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-block");
  questionDiv.innerHTML = `
    <div class="question">${currentQuestion + 1}. ${q.question}</div>
    <div class="options">
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q" value="${opt}">
          ${opt}
        </label>
      `).join("")}
    </div>
  `;
  quizContainer.appendChild(questionDiv);

  // Re-enable submit button for this question
  submitBtn.disabled = false;
}

submitBtn.addEventListener("click", () => {
  const selected = quizContainer.querySelector("input[name=q]:checked");
  if (!selected) {
    alert("Please select an option!");
    return;
  }

  // Disable submit button to prevent multiple clicks
  submitBtn.disabled = true;

  const q = quizData[currentQuestion];
  const labels = quizContainer.querySelectorAll("label");

  labels.forEach(label => {
    const input = label.querySelector("input");
    if (input.value === q.correct) {
      label.classList.add("correct");
    }
    if (input.checked && input.value !== q.correct) {
      label.classList.add("wrong");
    }
  });

  if (selected.value === q.correct) {
    score++;
  }

  // Delay to show correct/wrong before moving to next
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      quizContainer.innerHTML = "";
      submitBtn.style.display = "none";
      restartBtn.style.display = "inline-block";
      resultDiv.innerHTML = `<h2>Your Score: ${score} / ${quizData.length}</h2>`;
    }
  }, 3000);
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  submitBtn.style.display = "block";
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();

