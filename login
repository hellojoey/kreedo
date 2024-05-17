<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Kreedo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>kreedo</h1>
  </header>

  <main>
    <div class="login-container">
      <h2>Login</h2>
      <form id="loginForm" onsubmit="login(event)">
        <label for="username">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <div class="button-container">
          <button type="submit" class="option-button">Login</button>
          <button type="button" class="option-button" onclick="register()">Register</button>
        </div>
      </form>
    </div>
  </main>

  <script>
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

    function register() {
      alert('Registration page is under construction');
    }
  </script>
</body>
</html>
