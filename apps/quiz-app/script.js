// Modern Quiz App JavaScript

// Global variables
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let selectedOption = null;

// DOM Elements
const pages = {
    home: document.getElementById('home-page'),
    multipleChoice: document.getElementById('multiple-choice-page'),
    openEnded: document.getElementById('open-ended-page'),
    feedback: document.getElementById('feedback-page'),
    mcFeedback: document.getElementById('mc-feedback-page'),
    results: document.getElementById('results-page')
};

// File Upload and Quiz Start
const fileInput = document.getElementById('quiz-file');
const startQuizButton = document.getElementById('start-quiz');

fileInput.addEventListener('change', handleFileUpload);
startQuizButton.addEventListener('click', startQuiz);

// Multiple Choice Question Elements
const mcQuestionText = document.getElementById('mc-question-text');
const optionButtons = document.querySelectorAll('.option');
const mcSubmitButton = document.getElementById('mc-submit');

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove selected class from all options
        optionButtons.forEach(btn => btn.classList.remove('selected'));
        // Add selected class to clicked option
        button.classList.add('selected');
        selectedOption = parseInt(button.dataset.index);
        mcSubmitButton.disabled = false;
    });
});

mcSubmitButton.addEventListener('click', submitMultipleChoiceAnswer);

// Open-ended Question Elements
const oeQuestionText = document.getElementById('oe-question-text');
const userAnswerInput = document.getElementById('user-answer');
const oeSubmitButton = document.getElementById('oe-submit');

oeSubmitButton.addEventListener('click', submitOpenEndedAnswer);

// Feedback Elements
const feedbackQuestionText = document.getElementById('feedback-question-text');
const userAnswerDisplay = document.getElementById('user-answer-display');
const correctAnswerDisplay = document.getElementById('correct-answer-display');
const nextQuestionButton = document.getElementById('next-question');

nextQuestionButton.addEventListener('click', showNextQuestion);

// Multiple Choice Feedback Elements
const mcFeedbackQuestionText = document.getElementById('mc-feedback-question-text');
const mcNextQuestionButton = document.getElementById('mc-next-question');

mcNextQuestionButton.addEventListener('click', showNextQuestion);

// Results Elements
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const scorePercentageElement = document.getElementById('score-percentage');
const resultsListElement = document.querySelector('.results-list');
const downloadCsvButton = document.getElementById('download-csv');
const exportAnkiButton = document.getElementById('export-anki');
const goAgainButton = document.getElementById('go-again');
const importAnotherButton = document.getElementById('import-another');

downloadCsvButton.addEventListener('click', downloadCsv);
exportAnkiButton.addEventListener('click', exportAnki);
goAgainButton.addEventListener('click', resetQuiz);
importAnotherButton.addEventListener('click', importAnotherFile);

// Functions
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (validateQuizData(data)) {
                quizData = data;
                startQuizButton.disabled = false;
            } else {
                alert('Invalid quiz data format. Please check the JSON structure.');
            }
        } catch (error) {
            alert('Error parsing JSON file: ' + error.message);
        }
    };
    reader.readAsText(file);
}

function validateQuizData(data) {
    if (!Array.isArray(data) || data.length === 0) return false;
    
    return data.every(question => {
        if (!question.type || !question.question) return false;
        
        if (question.type === 'multiple-choice') {
            return Array.isArray(question.options) && 
                   question.options.length > 0 && 
                   typeof question.correctAnswer === 'number';
        } else if (question.type === 'open-ended') {
            return Array.isArray(question.acceptedAnswers) && 
                   question.acceptedAnswers.length > 0;
        }
        
        return false;
    });
}

function startQuiz() {
    userAnswers = new Array(quizData.length).fill(null);
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    if (index >= quizData.length) {
        showResults();
        return;
    }

    const question = quizData[index];
    
    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active'));
    
    if (question.type === 'multiple-choice') {
        // Show multiple choice question
        mcQuestionText.textContent = question.question;
        
        // Set up options
        optionButtons.forEach((button, i) => {
            if (i < question.options.length) {
                button.textContent = question.options[i];
                button.style.display = 'block';
                button.classList.remove('selected');
            } else {
                button.style.display = 'none';
            }
        });
        
        selectedOption = null;
        mcSubmitButton.disabled = true;
        pages.multipleChoice.classList.add('active');
    } else if (question.type === 'open-ended') {
        // Show open-ended question
        oeQuestionText.textContent = question.question;
        userAnswerInput.value = '';
        pages.openEnded.classList.add('active');
    }
}

function submitMultipleChoiceAnswer() {
    if (selectedOption === null) return;
    
    const question = quizData[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = {
        type: 'multiple-choice',
        questionText: question.question,
        userAnswer: selectedOption,
        correctAnswer: question.correctAnswer,
        isCorrect: selectedOption === question.correctAnswer
    };
    
    showMultipleChoiceFeedback();
}

function submitOpenEndedAnswer() {
    const userAnswer = userAnswerInput.value.trim();
    if (!userAnswer) {
        alert('Please enter an answer before submitting.');
        return;
    }
    
    const question = quizData[currentQuestionIndex];
    const isCorrect = question.acceptedAnswers.some(
        answer => answer.toLowerCase() === userAnswer.toLowerCase()
    );
    
    userAnswers[currentQuestionIndex] = {
        type: 'open-ended',
        questionText: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.acceptedAnswers[0],
        acceptedAnswers: question.acceptedAnswers,
        isCorrect: isCorrect
    };
    
    showOpenEndedFeedback();
}

function showMultipleChoiceFeedback() {
    const answer = userAnswers[currentQuestionIndex];
    const question = quizData[currentQuestionIndex];
    
    mcFeedbackQuestionText.textContent = question.question;
    
    // Reset all options
    for (let i = 0; i < 4; i++) {
        const optionElement = document.getElementById(`option-${i}`);
        optionElement.className = 'option';
        
        if (i < question.options.length) {
            optionElement.textContent = question.options[i];
            optionElement.style.display = 'block';
            
            if (i === answer.correctAnswer) {
                optionElement.classList.add('correct');
            } else if (i === answer.userAnswer && i !== answer.correctAnswer) {
                optionElement.classList.add('incorrect');
            }
        } else {
            optionElement.style.display = 'none';
        }
    }
    
    // Hide all pages and show feedback
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages.mcFeedback.classList.add('active');
}

function showOpenEndedFeedback() {
    const answer = userAnswers[currentQuestionIndex];
    
    feedbackQuestionText.textContent = answer.questionText;
    userAnswerDisplay.textContent = answer.userAnswer;
    correctAnswerDisplay.textContent = answer.acceptedAnswers.join(' or ');
    
    userAnswerDisplay.className = 'answer-box';
    userAnswerDisplay.classList.add(answer.isCorrect ? 'correct' : 'incorrect');
    correctAnswerDisplay.className = 'answer-box correct';
    
    // Hide all pages and show feedback
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages.feedback.classList.add('active');
}

function showNextQuestion() {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function showResults() {
    // Calculate score
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = quizData.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    scoreElement.textContent = correctAnswers;
    totalQuestionsElement.textContent = totalQuestions;
    scorePercentageElement.textContent = `${percentage}%`;
    
    // Clear previous results
    resultsListElement.innerHTML = '';
    
    // Add result items
    userAnswers.forEach((answer, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        const resultQuestion = document.createElement('div');
        resultQuestion.className = 'result-question';
        resultQuestion.textContent = `Question ${index + 1}: ${answer.questionText}`;
        
        const resultAnswers = document.createElement('div');
        resultAnswers.className = 'result-answers';
        
        const userAnswerElement = document.createElement('div');
        userAnswerElement.className = `result-user-answer ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        if (answer.type === 'multiple-choice') {
            const question = quizData[index];
            userAnswerElement.textContent = `Your answer: ${question.options[answer.userAnswer]}`;
            
            const correctAnswerElement = document.createElement('div');
            correctAnswerElement.className = 'result-correct-answer';
            correctAnswerElement.textContent = `Correct answer: ${question.options[answer.correctAnswer]}`;
            
            resultAnswers.appendChild(userAnswerElement);
            resultAnswers.appendChild(correctAnswerElement);
        } else {
            userAnswerElement.textContent = `Your answer: ${answer.userAnswer}`;
            
            const correctAnswerElement = document.createElement('div');
            correctAnswerElement.className = 'result-correct-answer';
            correctAnswerElement.textContent = `Accepted answers: ${answer.acceptedAnswers.join(' or ')}`;
            
            resultAnswers.appendChild(userAnswerElement);
            resultAnswers.appendChild(correctAnswerElement);
        }
        
        resultItem.appendChild(resultQuestion);
        resultItem.appendChild(resultAnswers);
        resultsListElement.appendChild(resultItem);
    });
    
    // Hide all pages and show results
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages.results.classList.add('active');
}

function downloadCsv() {
    let csvContent = 'Question,User Answer,Correct Answer,Result\n';
    
    userAnswers.forEach(answer => {
        let userAnswerText = '';
        let correctAnswerText = '';
        
        if (answer.type === 'multiple-choice') {
            const question = quizData.find(q => q.question === answer.questionText);
            userAnswerText = question.options[answer.userAnswer];
            correctAnswerText = question.options[answer.correctAnswer];
        } else {
            userAnswerText = answer.userAnswer;
            correctAnswerText = answer.acceptedAnswers.join(' or ');
        }
        
        // Escape quotes in text fields
        const escapedQuestion = answer.questionText.replace(/"/g, '""');
        const escapedUserAnswer = userAnswerText.replace(/"/g, '""');
        const escapedCorrectAnswer = correctAnswerText.replace(/"/g, '""');
        
        csvContent += `"${escapedQuestion}","${escapedUserAnswer}","${escapedCorrectAnswer}",${answer.isCorrect ? 'Correct' : 'Incorrect'}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'quiz_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportAnki() {
    let ankiContent = '';
    
    userAnswers.forEach(answer => {
        let correctAnswerText = '';
        
        if (answer.type === 'multiple-choice') {
            const question = quizData.find(q => q.question === answer.questionText);
            correctAnswerText = question.options[answer.correctAnswer];
        } else {
            correctAnswerText = answer.acceptedAnswers.join(' or ');
        }
        
        ankiContent += `${answer.questionText};${correctAnswerText}\n`;
    });
    
    const blob = new Blob([ankiContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'anki_flashcards.txt');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetQuiz() {
    // Reset to start the quiz again with the same data
    Object.values(pages).forEach(page => page.classList.remove('active'));
    
    // Reset variables
    currentQuestionIndex = 0;
    userAnswers = [];
    selectedOption = null;
    
    // Start the quiz again with the same data
    startQuiz();
}

function importAnotherFile() {
    // Reset to home page
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages.home.classList.add('active');
    
    // Reset variables
    currentQuestionIndex = 0;
    userAnswers = [];
    selectedOption = null;
    quizData = [];
    
    // Clear file input
    fileInput.value = '';
    startQuizButton.disabled = true;
} 