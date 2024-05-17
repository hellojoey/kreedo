var questions = [];
var currentQuestionIndex = 0;
var selectedOption = null;
var answers = {};

// Load questions from CSV
function loadQuestions() {
  Papa.parse("questions.csv", {
    download: true,
    header: true,
    complete: function(results) {
      questions = results.data;
      shuffleQuestions();
      displayNextQuestion();
    }
  });
}

// Shuffle the questions array while keeping related questions in sequence
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  ensureRelatedQuestions();
}

// Ensure related questions follow each other based on MustBeAfter field
function ensureRelatedQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const currentQuestion = questions[i];
    if (currentQuestion.MustBeAfter) {
      const relatedIndex = questions.findIndex(q => q.QuestionID === currentQuestion.MustBeAfter);
      if (relatedIndex > -1 && relatedIndex !== i - 1) {
        const relatedQuestion = questions.splice(relatedIndex, 1)[0];
        questions.splice(i, 0, relatedQuestion);
      }
    }
  }
}

// Display the next question
function displayNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    var question = questions[currentQuestionIndex];
    document.getElementById('questionID').innerText = '#' + formatQuestionID(question.QuestionID);
    document.getElementById('questionHashtags').innerHTML = formatHashtags(question.Hashtags);
    document.getElementById('questionText').innerText = question.Question;
    selectedOption = answers[question.QuestionID] || null;
    highlightSelectedOption();
  } else {
    document.getElementById('questionText').innerText = "No more questions.";
    document.getElementById('yesButton').style.display = 'none';
    document.getElementById('noButton').style.display = 'none';
    document.getElementById('skipButton').style.display = 'none';
    document.getElementById('submitButton').style.display = 'none';
    document.getElementById('prevButton').style.display = 'none';
  }
}

// Format the question ID to 7 digits
function formatQuestionID(id) {
  return id.toString().padStart(7, '0');
}

// Format hashtags as hyperlinks with circles around them
function formatHashtags(hashtags) {
  return hashtags.split(' ').map(tag => `<a href="#">${tag}</a>`).join(' ');
}

// Highlight the selected option
function highlightSelectedOption() {
  if (selectedOption === 'yes') {
    document.getElementById('yesButton').classList.add('selected');
    document.getElementById('noButton').classList.remove('selected');
  } else if (selectedOption === 'no') {
    document.getElementById('noButton').classList.add('selected');
    document.getElementById('yesButton').classList.remove('selected');
  } else {
    document.getElementById('yesButton').classList.remove('selected');
    document.getElementById('noButton').classList.remove('selected');
  }
}

// Handle option selection
function selectOption(option) {
  selectedOption = option;
  highlightSelectedOption();
}

// Handle skip and other responses
function handleResponse(response) {
  if (selectedOption) {
    answers[questions[currentQuestionIndex].QuestionID] = selectedOption;
  }
  console.log('User response:', response);
  currentQuestionIndex++;
  displayNextQuestion();
}

// Submit response
function submitResponse() {
  if (selectedOption) {
    handleResponse(selectedOption);
  } else {
    alert('Please select an option before submitting.');
  }
}

// Show the previous question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayNextQuestion();
  }
}

// Toggle the hamburger menu
function toggleMenu() {
  var menu = document.getElementById('menu');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

window.onload = loadQuestions;
