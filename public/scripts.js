document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();

  function loadQuestions() {
    fetch('questions.csv')
      .then(response => response.text())
      .then(data => {
        const questions = Papa.parse(data, { header: true }).data;
        setupNavigation(questions);
      })
      .catch(error => console.error('Error loading questions:', error));
  }

  function setupNavigation(questions) {
    let currentIndex = 0;

    displayQuestion(questions, currentIndex);

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
        alert('No more questions.');
      }
    });

    document.getElementById('noButton').addEventListener('click', () => {
      saveAnswer(questions[currentIndex].QuestionID, 'no');
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        displayQuestion(questions, currentIndex);
      } else {
        alert('No more questions.');
      }
    });

    document.getElementById('yesButton').addEventListener('click', () => {
      saveAnswer(questions[currentIndex].QuestionID, 'yes');
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        displayQuestion(questions, currentIndex);
      } else {
        alert('No more questions.');
      }
    });
  }

  function displayQuestion(questions, index) {
    const questionText = document.getElementById('questionText');
    const questionID = document.getElementById('questionID');
    const questionHashtags = document.getElementById('questionHashtags');

    if (questions.length > 0 && index < questions.length) {
      const question = questions[index];
      questionText.textContent = question.Question;
      questionID.textContent = formatQuestionID(question.QuestionID);
      questionHashtags.innerHTML = generateHashtagLinks(question.Hashtags);
    } else {
      questionText.textContent = 'No more questions.';
      questionID.textContent = '';
      questionHashtags.textContent = '';
    }
  }

  function formatQuestionID(id) {
    return id.toString().padStart(6, '0');
  }

  function generateHashtagLinks(hashtags) {
    if (!hashtags) return '';
    return hashtags.split(' ').map(tag => `<a href="#">${tag}</a>`).join(' ');
  }

  function saveAnswer(questionID, answer) {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid);
      userDocRef.update({
        [`answers.${questionID}.currentAnswer`]: answer,
        [`answers.${questionID}.history`]: firebase.firestore.FieldValue.arrayUnion({ answer: answer, timestamp: new Date().toISOString() }),
        totalAnswers: firebase.firestore.FieldValue.increment(1),
        dailyProgress: firebase.firestore.FieldValue.increment(2) // Assuming each answer increments progress by 2% for simplicity
      }).then(() => {
        console.log('Answer saved successfully.');
      }).catch((error) => {
        console.error('Error saving answer: ', error);
      });
    } else {
      console.error('No user is signed in');
    }
  }
});
