document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          window.location.href = 'profile.html';
        })
        .catch((error) => {
          errorMessage.textContent = `Login failed: ${error.message}`;
        });
    });
  });
  