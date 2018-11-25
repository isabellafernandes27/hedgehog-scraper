const express = require('express');
const app = express();
const cors = require('cors');
const Nightmare = require('nightmare');

const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send("Hedgehog Time");
});

app.get('/hedgie/:keyword', (req, res) => {
  var keyword = req.params.keyword;

  function findHedgieImage(keyword) {
    var nightmare = Nightmare();

    return nightmare
      .goto('https://www.google.com')
      .insert('input[title="Search"]', `hedgehog ${keyword}`)
      .click('input[value="Google Search"]')
      .wait('a.q.qs')
      .click('a.q.qs')
      .wait('div#res.med')
      .evaluate(function() {
        var photoDivs = document.querySelectorAll('img.rg_ic');
        var list = [].slice.call(photoDivs);

        return list.map(function(div) {
          return div.src;
        });
      })
      .end()
      .then(function (result) {
        return result.slice(1, 5);
      })
      .then(function (images) {
        res.json(images);
      })
      .catch(function (error) {
        console.error('Search failed:', error);
      });
  }

  findHedgieImage(keyword);

});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
