function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Simple client-side authentication for demonstration purposes
    if (email === 'user@example.com' && password === 'password') {
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
  