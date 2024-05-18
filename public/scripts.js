// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMs-xS6_NKJh2DKOeHnLY3NTTp_zUNCm0",
    authDomain: "kreedo-5659e.firebaseapp.com",
    projectId: "kreedo-5659e",
    storageBucket: "kreedo-5659e.appspot.com",
    messagingSenderId: "395650604091",
    appId: "kreedo-5659e",
    measurementId: "G-WT40DT0QRP"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
  
  // Store user answers in localStorage
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
  
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
    console.log('Displaying question:', index);
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
  
  // Function to handle navigation
  function setupNavigation(questions) {
    let currentIndex = 0;
    console.log('Setting up navigation for questions:', questions);
  
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
  
  // Function to toggle the hamburger menu
  function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('questionText')) {
      console.log('Questions element found. Loading questions...');
      loadQuestions();
    } else {
      console.log('Questions element not found. Skipping question loading.');
    }
  
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
            // Signed in 
            const user = userCredential.user;
            // Update the user profile
            return user.updateProfile({
              displayName: fullName
            }).then(() => {
              // Store additional user information in Firestore
              return db.collection('users').doc(user.uid).set({
                fullName: fullName,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              });
            });
          })
          .then(() => {
            // Registration successful
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
            // Signed in
            window.location.href = 'index.html';
          })
          .catch((error) => {
            errorMessage.textContent = `Login failed: ${error.message}`;
          });
      });
    }
  });
  