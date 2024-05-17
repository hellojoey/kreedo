body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 40px;
  box-sizing: border-box;
}

.header-right {
  display: flex;
  align-items: center;
}

.hamburger-menu {
  cursor: pointer;
  margin-left: 10px;
}

.hamburger-menu span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
}

h1 {
  font-size: 24px;
  text-transform: lowercase;
  margin: 0;
}

.login-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: lowercase;
}

.login-button:hover {
  background-color: #0056b3;
}

nav {
  display: none;
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  padding: 10px 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  text-transform: lowercase;
}

nav ul li:hover {
  background-color: #f4f4f4;
}

.hidden {
  display: none;
}

main {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  width: 100%;
}

.question-nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.nav-link {
  font-size: 16px;
  color: #007BFF;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.nav-link:hover {
  text-decoration: underline;
}

.hashtags-container {
  margin-bottom: 10px;
}

.small-text {
  font-size: 14px;
  margin: 0;
  text-align: left;
  width: 100%;
}

#questionHashtags {
  margin-top: 10px;
  text-align: left;
}

#questionHashtags a {
  margin-right: 8px;
  color: #007BFF;
  text-decoration: none;
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #007BFF;
  border-radius: 12px;
}

#questionHashtags a:hover {
  background-color: #007BFF;
  color: white;
}

#questionID {
  color: gray;
  font-style: italic;
  margin-bottom: 10px;
}

.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.large-text {
  font-size: 24px;
  margin: 20px 0;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;
}

.option-button {
  padding: 20px 40px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
  flex: 1;
}

.option-button:first-child {
  margin-right: 20px;
}

.option-button.selected {
  background-color: #4CAF50;
  color: white;
}

.submit-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  padding: 0 40px;
  box-sizing: border-box;
}

.small-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: lowercase;
  max-width: 150px;
  flex: 1;
}

.small-button:hover {
  background-color: #0056b3;
}

.small-button:first-child {
  margin-right: 20px;
}

.small-button:last-child {
  margin-left: 20px;
}
