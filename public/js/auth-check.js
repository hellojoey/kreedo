// auth-check.js
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();
    
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in:', user.uid);
        updateMenuForLoggedInUser();
      } else {
        console.log('No user is signed in');
        window.location.href = 'login.html';
      }
    });
  
    function updateMenuForLoggedInUser() {
      const menu = document.getElementById('menu');
      menu.innerHTML = `
        <ul>
          <li><a href="profile.html">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Help</a></li>
          <li><a href="#" onclick="logout()">Logout</a></li>
        </ul>
      `;
    }
  
    function logout() {
      firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
      });
    }
  });
  