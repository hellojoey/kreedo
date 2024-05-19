document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    if (firebase.apps.length === 0) {
      console.error('Firebase is not initialized');
    } else {
      console.log('Firebase initialized');
    }
  
    loadUserProfile();
  
    function loadUserProfile() {
      console.log('Loading user profile...');
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userDocRef = firebase.firestore().collection('users').doc(user.uid);
          userDocRef.get().then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              document.getElementById('username').textContent = `@${userData.username}`;
              document.getElementById('fullName').textContent = userData.fullName;
              document.getElementById('profilePicture').src = userData.profilePicture || 'default-profile-pic.png';
              document.getElementById('totalAnswers').textContent = userData.totalAnswers;
              document.getElementById('progressPercentage').textContent = `${userData.dailyProgress.toFixed(2)}%`;
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
      });
    }
  
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
  
    window.changeAnswer = function(questionID) {
      const newAnswer = prompt("Enter new answer:");
      if (newAnswer) {
        saveUserAnswer(questionID, newAnswer);
      }
    }
  
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
  
    window.toggleMenu = function() {
      const menu = document.getElementById('menu');
      menu.classList.toggle('hidden');
    }
  });
  