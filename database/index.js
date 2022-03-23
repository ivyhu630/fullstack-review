const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });

let repoSchema = new mongoose.Schema({
  username: String,
  repo_name: String,
  repo_id: { type: Number, unique: true},
  git_url: String,
  forks: Number,
});

// let topRepoSchema = new mongoose.Schema({
//   username: String,
//   repo_name: String,
//   repo_id: { type: Number, unique: true},
//   git_url: String,
//   forks: Number,
// });

let Repo = mongoose.model('Repo', repoSchema);
// let TopRepo = mongoose.model('TopRepo', topRepoSchema);

let save = function (data) {
  var preCount;
  Repo.find()
  .then(repos=> {
    // console.log('repos are ', repos);
    preCount = repos.length});

  var promiseContainer = []
  data.forEach(repo => {
    var username = repo.owner.login;
    var repo_name = repo.name;
    var repo_id = repo.id;
    var git_url = repo.html_url;
    var forks = repo.forks;
    repo = new Repo({ username, repo_name, repo_id, git_url, forks });
    promiseContainer.push(repo.save());
  });
  return Promise.all(promiseContainer)
  .then(() => {
    return Repo.find()
  })
  .then(repos => {
    var updateNum = repos.length - preCount;
    console.log('number is ', updateNum);
    return updateNum;
  })
  .catch(err => {
    console.log('Duplicate exist skip adding to database');
    return 0;
  });
};

let getTop25 = async function () {
  try {
    const repos = await Repo.find().sort({ forks: -1}).limit(25);
    return repos;
  } catch(e) {
    console.log(e.message);
  }
};


module.exports.save = save;
module.exports.getTop25 = getTop25;
