const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register-endpoint', (req, res) => {
  const { email, password } = req.body;
  console.log(`Received registration: ${email}, ${password}`);
  
  // Simulate registration logic
  if (email && password) {
    res.status(200).send('Registration successful');
  } else {
    res.status(400).send('Registration failed');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
