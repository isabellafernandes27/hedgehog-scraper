const express = require('express');
const app = express();
const cors = require('cors');
const Nightmare = require('nightmare');

const port = 3000;

app.use(cors());

// first endpoint - already built
// this says that when the app is at "/" - so "home", it will send a response of "Hedgehog Time". That is why we see those words on the screen when we go to localhost:3000/.
app.get('/', (req, res) => {
  res.send("Hedgehog Time");
});

// your endpoint
app.get('/pets', (req, res) => {
  res.send("I love puppies!!!")
});

app.get('/:name', (req, res) => {
  res.send(`Hi, ${name}!`)
});

// scraper endpoint

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
