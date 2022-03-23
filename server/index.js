const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const getTop25 = require('../database/index.js').getTop25;
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  var updateCt = 0;
  return getReposByUsername(req.body.username)
    .then(data => {
      return save(data.data)
    })
    .then(ct =>{
      updateCt = ct;
      // console.log('update count is ', updateCt);
    }).then(() => {
      return getTop25();
    })
    .then(data => {
      // console.log('getting z ', data.updateCt);
      res.send({data, count: updateCt});
    })
    .catch(err => {console.log(err)});

});

app.get('/repos', function (req, res) {
  getTop25()
  .then(data => {
    // console.log(data);
    res.send(data);
  })
  .catch(err => {
    res.send(0);
    console.log(err)});

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

