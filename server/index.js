const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const getTop25 = require('../database/index.js').getTop25;
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {

  return getReposByUsername(req.body.username)
    .then(data => {
      // console.log(data.data);
      save(data.data);
    })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getTop25().
  then(data => {
    console.log(data);
    res.send('success');
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

