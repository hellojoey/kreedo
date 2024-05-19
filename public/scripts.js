// User answers stored in localStorage
const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};

// Questions section
// Function to load questions from the CSV file
function loadQuestions() {
    console.log('Loading questions...');
    fetch('questions.csv')
        .then(response => {
            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Questions loaded:', data);
            if (typeof Papa !== 'undefined') {
                Papa.parse(data, {
                    header: true,
                    complete: function(results) {
                        console.log('Parsed questions:', results.data);
                        const questions = shuffleArray(results.data);
                        displayQuestion(questions);
                        setupNavigation(questions);
                    },
                    error: function(error) {
                        console.error('Error parsing CSV:', error);
                    }
                });
            } else {
                console.error('PapaParse library is not defined.');
            }
        })
        .catch(error => console.error('Error loading questions:', error));
}

// Function to shuffle the questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to display a question
function displayQuestion(questions, index = 0) {
    const questionText = document.getElementById('questionText');
    const questionID = document.getElementById('questionID');
    const questionHashtags = document.getElementById('questionHashtags');
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');

    if (questions.length > 0 && index < questions.length) {
        const question = questions[index];
        questionText.textContent = capitalizeFirstLetter(question.Question);
        questionID.textContent = formatQuestionID(question.QuestionID);
        questionHashtags.innerHTML = generateHashtagLinks(question.Hashtags);

        // Highlight the user's previous answer if it exists
        noButton.style.backgroundColor = userAnswers[question.QuestionID] === 'no' ? '#ffcccc' : '#008080';
        yesButton.style.backgroundColor = userAnswers[question.QuestionID] === 'yes' ? '#ccffcc' : '#008080';
    } else {
        questionText.textContent = 'No more questions.';
        questionID.textContent = '';
        questionHashtags.textContent = '';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatQuestionID(id) {
    return id.toString().padStart(8, '0');
}

// Function to generate hashtag links
function generateHashtagLinks(hashtags) {
    if (!hashtags) return '';
    return hashtags.split(' ').map(tag => `<a href="#">${tag}</a>`).join(' ');
}
// End of questions section

// Navigation section
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

    document.getElementById('noButton').addEventListener('click', () => {
        userAnswers[questions[currentIndex].QuestionID] = 'no';
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            displayQuestion(questions, currentIndex);
        } else {
            displayQuestion([], 0);
        }
    });

    document.getElementById('yesButton').addEventListener('click', () => {
        userAnswers[questions[currentIndex].QuestionID] = 'yes';
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            displayQuestion(questions, currentIndex);
        } else {
            displayQuestion([], 0);
        }
    });
}
// End of navigation section

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    loadQuestions();

    // Registration functionality
    if (document.getElementById('registrationForm')) {
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorMessage = document.getElementById('error-message');

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match!';
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return user.updateProfile({
                        displayName: fullName
                    });
                })
                .then(() => {
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    errorMessage.textContent = `Registration failed: ${error.message}`;
                });
        });
    }

    // Login functionality
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    errorMessage.textContent = `Login failed: ${error.message}`;
                });
        });
    }
});
// End of DOMContentLoaded event listener

document.addEventListener('DOMContentLoaded', () => {
  loadUserProfile();

  // Function to fetch and display user profile data
  function loadUserProfile() {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid);
      userDocRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          document.getElementById('fullName').textContent = userData.fullName;
          document.getElementById('email').textContent = userData.email;
          document.getElementById('profilePicture').src = userData.profilePicture || 'default-profile-pic.png';
          displayUserAnswers(userData.answers);
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    } else {
      console.log('No user is signed in');
    }
  }

  // Function to display user answers
  function displayUserAnswers(answers) {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    for (const questionID in answers) {
      const listItem = document.createElement('li');
      const answerData = answers[questionID];
      listItem.innerHTML = `
        <p>Question ${questionID}</p>
        <p>Current Answer: ${answerData.currentAnswer}</p>
        <p>History:</p>
        <ul>
          ${answerData.history.map(hist => `<li>${hist.answer} on ${new Date(hist.timestamp).toLocaleString()}</li>`).join('')}
        </ul>
        <button onclick="changeAnswer('${questionID}')">Change Answer</button>
      `;
      questionsList.appendChild(listItem);
    }
  }

  // Function to change answer
  window.changeAnswer = function(questionID) {
    const newAnswer = prompt("Enter new answer:");
    if (newAnswer) {
      saveUserAnswer(questionID, newAnswer);
    }
  }

  // Function to save user answer
  function saveUserAnswer(questionID, answer) {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid);
      userDocRef.update({
        [`answers.${questionID}.currentAnswer`]: answer,
        [`answers.${questionID}.history`]: firebase.firestore.FieldValue.arrayUnion({ answer: answer, timestamp: new Date().toISOString() })
      }).then(() => {
        loadUserProfile();
      }).catch((error) => {
        console.error('Error saving answer: ', error);
      });
    } else {
      console.error('No user is signed in');
    }
  }
});
