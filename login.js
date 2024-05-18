function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if the user exists
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem('loggedIn', true);
      alert('Login successful');
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password');
    }
  }
  
  function redirectToRegister() {
    console.log("redirectToRegister function called");
    window.location.href = 'register.html';
  }
  
  function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  }
  
  console.log("login.js script loaded and functions defined.");
  