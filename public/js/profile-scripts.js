document.addEventListener('DOMContentLoaded', () => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  auth.onAuthStateChanged(user => {
    const headerRight = document.querySelector('.header-right');
    const loginButton = document.querySelector('.login-button');
    const menu = document.getElementById('menu');

    if (user) {
      // User is signed in, remove the login button
      if (loginButton) {
        headerRight.removeChild(loginButton);
      }

      // Update the menu for logged-in users
      menu.innerHTML = `
        <ul>
          <li><a href="profile.html">profile</a></li>
          <li><a href="#">settings</a></li>
          <li><a href="#">help</a></li>
          <li><a href="#" onclick="firebase.auth().signOut().then(() => { window.location.href = 'index.html'; })">logout</a></li>
        </ul>
      `;

      // Load logbook data
      loadLogbook(user.uid);
    } else {
      // User is not signed in, redirect to login page
      window.location.href = 'login.html';
    }
  });

  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menu = document.getElementById('menu');

  hamburgerMenu.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  document.querySelector('h1 a').addEventListener('click', (event) => {
    event.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = 'questions.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  });

  document.getElementById('exportButton').addEventListener('click', exportToCSV);

  function loadLogbook(userId) {
    db.collection('questions').get().then(querySnapshot => {
      const questions = {};
      querySnapshot.forEach(doc => {
        questions[doc.id] = doc.data().question;
      });
      console.log('Questions from Firestore:', questions);

      db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const answers = data.answers || {};
          const questionsList = document.getElementById('questionsList');
          questionsList.innerHTML = '';

          Object.keys(answers).forEach(questionId => {
            const entry = answers[questionId];
            const questionText = questions[questionId] || 'Unknown Question';
            console.log(`Question ID: ${questionId}, Question: ${questionText}`);
            const questionElement = document.createElement('div');
            questionElement.classList.add('logbook-entry');
            questionElement.innerHTML = `
              <h3>${questionText}</h3>
              <p>ID: ${formatQuestionID(questionId)}</p>
              <hr>
              <div class="answer-history">
                ${entry.history.map(item => `
                  <div class="answer-history-item">
                    Answer: ${item.answer} on ${new Date(item.timestamp).toLocaleString()}
                  </div>
                `).join('')}
              </div>
              <button class="change-answer-button" data-question-id="${questionId}">Change Answer</button>
            `;
            questionsList.appendChild(questionElement);
          });

          document.querySelectorAll('.change-answer-button').forEach(button => {
            button.addEventListener('click', event => {
              const questionId = event.target.getAttribute('data-question-id');
              changeAnswer(userId, questionId);
            });
          });
        } else {
          console.error('User document does not exist');
        }
      }).catch(error => {
        console.error('Error fetching user document:', error);
      });
    }).catch(error => {
      console.error('Error fetching questions from Firestore:', error);
    });
  }

  function formatQuestionID(id) {
    return id.toString().padStart(6, '0');
  }

  function changeAnswer(userId, questionId) {
    // Implement the logic for changing an answer
  }

  function exportToCSV() {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection('users').doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const answers = data.answers || {};
          const csvData = [];

          Object.keys(answers).forEach(questionId => {
            const entry = answers[questionId];
            entry.history.forEach(item => {
              csvData.push({
                question: entry.question,
                questionId: formatQuestionID(questionId),
                answer: item.answer,
                timestamp: new Date(item.timestamp).toLocaleString()
              });
            });
          });

          const csv = Papa.unparse(csvData);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'logbook.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  auth.onAuthStateChanged(user => {
    if (user) {
      loadLogbook(user.uid);
    } else {
      window.location.href = 'login.html';
    }
  });

  function loadLogbook(userId) {
    db.collection('questions').get().then(querySnapshot => {
      const questions = {};
      querySnapshot.forEach(doc => {
        questions[doc.id] = doc.data().question;
      });

      db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const answers = data.answers || {};
          const questionsList = document.getElementById('questionsList');
          questionsList.innerHTML = '';

          Object.keys(answers).forEach(questionId => {
            const entry = answers[questionId];
            const questionText = questions[questionId] || 'Unknown Question';
            const questionElement = document.createElement('div');
            questionElement.classList.add('logbook-entry');
            questionElement.innerHTML = `
              <h3>${questionText}</h3>
              <p>ID: ${formatQuestionID(questionId)}</p>
              <hr>
              <div class="answer-history">
                ${entry.history.map(item => `
                  <div class="answer-history-item">
                    Answer: ${item.answer} on ${new Date(item.timestamp).toLocaleString()}
                  </div>
                `).join('')}
              </div>
              <button class="change-answer-button" data-question-id="${questionId}">Change Answer</button>
            `;
            questionsList.appendChild(questionElement);
          });

          document.querySelectorAll('.change-answer-button').forEach(button => {
            button.addEventListener('click', event => {
              const questionId = event.target.getAttribute('data-question-id');
              changeAnswer(user.uid, questionId);
            });
          });
        }
      });
    });
  }

  function formatQuestionID(id) {
    return id.toString().padStart(6, '0');
  }

  function changeAnswer(userId, questionId) {
    // Implement the logic for changing an answer
  }

  document.getElementById('exportButton').addEventListener('click', exportToCSV);

  function exportToCSV() {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection('users').doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const answers = data.answers || {};
          const csvData = [];

          Object.keys(answers).forEach(questionId => {
            const entry = answers[questionId];
            entry.history.forEach(item => {
              csvData.push({
                question: entry.question,
                questionId: formatQuestionID(questionId),
                answer: item.answer,
                timestamp: new Date(item.timestamp).toLocaleString()
              });
            });
          });

          const csv = Papa.unparse(csvData);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'logbook.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    }
  }
});
