// Function to load questions from the CSV file
function loadQuestions() {
  console.log('Loading questions...');
  fetch('questions.csv')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          console.log('Questions loaded:', data);
          const questions = parseCSV(data);
          console.log('Parsed questions:', questions);
          displayQuestion(questions);
          setupNavigation(questions);
      })
      .catch(error => console.error('Error loading questions:', error));
}

// Function to parse CSV data
function parseCSV(data) {
  const lines = data.split('\n');
  const result = [];
  for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length > 2) {
          result.push({
              id: row[0],
              mustBeAfter: row[1],
              question: row[2],
              hashtags: row[3]
          });
      }
  }
  return result;
}

// Function to display a question
function displayQuestion(questions, index = 0) {
  const questionText = document.getElementById('questionText');
  const questionID = document.getElementById('questionID');
  const questionHashtags = document.getElementById('questionHashtags');

  if (questions.length > 0 && index < questions.length) {
      const question = questions[index];
      questionText.textContent = question.question;
      questionID.textContent = `#${question.id}`;
      questionHashtags.innerHTML = generateHashtagLinks(question.hashtags);
  } else {
      questionText.textContent = 'No more questions.';
      questionID.textContent = '';
      questionHashtags.textContent = '';
  }
}

// Function to generate hashtag links
function generateHashtagLinks(hashtags) {
  if (!hashtags) return '';
  return hashtags.split(' ').map(tag => `<a href="#">#${tag}</a>`).join(' ');
}

// Function to handle navigation
function setupNavigation(questions) {
  let currentIndex = 0;

  document.getElementById('prevButton').addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          displayQuestion(questions, currentIndex);
      }
  });

  document.getElementById('skipButton').addEventListener('click', () => {
      if (currentIndex < questions.length - 1) {
          currentIndex++;
          displayQuestion(questions, currentIndex);
      } else {
          displayQuestion([], 0);
      }
  });

  document.getElementById('submitButton').addEventListener('click', () => {
      // Handle the submission logic here
      alert('Response submitted');
      if (currentIndex < questions.length - 1) {
          currentIndex++;
          displayQuestion(questions, currentIndex);
      } else {
          displayQuestion([], 0);
      }
  });

  document.getElementById('noButton').addEventListener('click', () => {
      // Handle the "No" option logic here
      if (currentIndex < questions.length - 1) {
          currentIndex++;
          displayQuestion(questions, currentIndex);
      } else {
          displayQuestion([], 0);
      }
  });

  document.getElementById('yesButton').addEventListener('click', () => {
      // Handle the "Yes" option logic here
      if (currentIndex < questions.length - 1) {
          currentIndex++;
          displayQuestion(questions, currentIndex);
      } else {
          displayQuestion([], 0);
      }
  });
}

// Function to toggle the hamburger menu
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', loadQuestions);
