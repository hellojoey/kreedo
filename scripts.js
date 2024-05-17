document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const closeButton = document.getElementById('closeButton');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
  
    // Toggle the login modal
    function toggleLogin() {
      if (loginModal.classList.contains('hidden')) {
        loginModal.classList.remove('hidden');
      } else {
        loginModal.classList.add('hidden');
      }
    }
  
    loginButton.addEventListener('click', toggleLogin);
    closeButton.addEventListener('click', toggleLogin);
  
    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Simple client-side authentication for demonstration purposes
      if (username === 'user' && password === 'password') {
        localStorage.setItem('loggedIn', true);
        toggleLogin();
        alert('Login successful');
        loginButton.innerText = 'logout';
        loginButton.removeEventListener('click', toggleLogin);
        loginButton.addEventListener('click', logout);
      } else {
        alert('Invalid username or password');
      }
    });
  
    // Check if the user is logged in
    function checkLogin() {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn) {
        loginButton.innerText = 'logout';
        loginButton.removeEventListener('click', toggleLogin);
        loginButton.addEventListener('click', logout);
      }
    }
  
    // Handle logout
    function logout() {
      localStorage.removeItem('loggedIn');
      loginButton.innerText = 'login';
      loginButton.removeEventListener('click', logout);
      loginButton.addEventListener('click', toggleLogin);
      alert('Logged out');
    }
  
    checkLogin();
  });
  