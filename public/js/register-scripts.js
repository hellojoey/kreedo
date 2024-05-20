document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const fullName = document.getElementById('fullName').value;
      const username = document.getElementById('username').value;
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
          const userDocRef = db.collection('users').doc(user.uid);
          return userDocRef.set({
            username: username,
            fullName: fullName,
            profilePicture: '', // Set a default profile picture URL
            totalAnswers: 0,
            dailyProgress: 0,
            answers: {}
          });
        })
        .then(() => {
          window.location.href = 'login.html';
        })
        .catch((error) => {
          errorMessage.textContent = `Registration failed: ${error.message}`;
        });
    });
  });
  