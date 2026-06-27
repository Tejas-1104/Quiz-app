const quizData = [
{
    question: "Which language is used to create web pages?",
    a: "Python",
    b: "HTML",
    c: "Java",
    d: "C++",
    correct: "b"
},
{
    question: "Which language is used for styling web pages?",
    a: "Java",
    b: "CSS",
    c: "Python",
    d: "SQL",
    correct: "b"
},
{
    question: "Which language makes websites interactive?",
    a: "JavaScript",
    b: "C",
    c: "PHP",
    d: "Java",
    correct: "a"
},
{
    question: "Which planet is known as the Red Planet?",
    a: "Earth",
    b: "Mars",
    c: "Jupiter",
    d: "Saturn",
    correct: "b"
},
{
    question: "What is the capital city of Australia?",
    a: "Sydney",
    b: "Melbourne",
    c: "Canberra",
    d: "Brisbane",
    correct: "c"
},
{
    question: "Who painted the Mona Lisa?",
    a: "Vincent van Gogh",
    b: "Leonardo da Vinci",
    c: "Pablo Picasso",
    d: "Claude Monet",
    correct: "b"
},
{
    question: "Which is the largest ocean on Earth?",
    a: "Atlantic Ocean",
    b: "Indian Ocean",
    c: "Pacific Ocean",
    d: "Arctic Ocean",
    correct: "c"
},
{
    question: "What is the chemical symbol for gold?",
    a: "Au",
    b: "Ag",
    c: "Fe",
    d: "Pb",
    correct: "a"
},
{
    question: "Which gas is most abundant in the Earth's atmosphere?",
    a: "Oxygen",
    b: "Hydrogen",
    c: "Nitrogen",
    d: "Carbon Dioxide",
    correct: "c"
},
{
    question: "How many bones are there in an adult human body?",
    a: "106",
    b: "206",
    c: "306",
    d: "406",
    correct: "b"
}
];

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

const question = document.getElementById("question");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const nextBtn = document.getElementById("nextBtn");

loadQuestion();

function loadQuestion() {
    const q = quizData[currentQuestion];

    question.innerText = q.question;
    optionA.innerText = q.a;
    optionB.innerText = q.b;
    optionC.innerText = q.c;
    optionD.innerText = q.d;

    document.querySelectorAll("input[name='answer']").forEach(radio => {
        radio.checked = false;
    });

    // Update progress tracking
    const progressBar = document.getElementById("progressBar");
    const questionNumber = document.getElementById("questionNumber");
    if (progressBar) {
        const progressPercent = (currentQuestion / quizData.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
    if (questionNumber) {
        questionNumber.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
    }
}

nextBtn.addEventListener("click", function () {

    const selected = document.querySelector("input[name='answer']:checked");

    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    const currentQuizQuestion = quizData[currentQuestion];
    if (selected.value === currentQuizQuestion.correct) {
        score++;
    } else {
        incorrectAnswers.push({
            question: currentQuizQuestion.question,
            userAnswer: currentQuizQuestion[selected.value],
            correctAnswer: currentQuizQuestion[currentQuizQuestion.correct]
        });
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        // Set progress to 100% on completion
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            progressBar.style.width = "100%";
        }
        const questionNumber = document.getElementById("questionNumber");
        if (questionNumber) {
            questionNumber.innerText = "Finished";
        }

        // Render beautiful results dashboard
        let resultsHTML = `
            <div class="results-panel">
                <h2>Quiz Completed!</h2>
                <div class="score-badge">${score}/${quizData.length}</div>
                <p>You answered ${score} out of ${quizData.length} questions correctly. ${score === quizData.length ? 'Perfect score! 🌟' : 'Good effort! Try again to get 100%.'}</p>
        `;

        if (incorrectAnswers.length > 0) {
            resultsHTML += `
                <div class="wrong-answers-container">
                    <h3>Review Incorrect Answers</h3>
                    <div class="wrong-answers-list">
            `;
            incorrectAnswers.forEach((item, index) => {
                resultsHTML += `
                    <div class="wrong-answer-item">
                        <div class="wrong-question"><strong>Q${index + 1}:</strong> ${item.question}</div>
                        <div class="answers-comparison">
                            <div class="user-choice">Your Answer:<span class="highlight-red">${item.userAnswer}</span></div>
                            <div class="correct-choice">Correct Answer:<span class="highlight-green">${item.correctAnswer}</span></div>
                        </div>
                    </div>
                `;
            });
            resultsHTML += `
                    </div>
                </div>
            `;
        }

        resultsHTML += `
                <button onclick="location.reload()">Restart Quiz</button>
            </div>
        `;

        document.getElementById("quiz").innerHTML = resultsHTML;
    }
});
