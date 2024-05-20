document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) {
    console.error('Login form not found');
    return;
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Login form submitted');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (!email || !password) {
      console.error('Email or password field is empty');
      errorMessage.textContent = 'Please enter both email and password.';
      return;
    }

    console.log(`Email: ${email}, Password: ${password}`);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User signed in successfully', userCredential);
        console.log('Redirecting to questions.html');
        window.location.href = 'questions.html';
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        errorMessage.textContent = `Login failed: ${error.message}`;
      });
  });
});
