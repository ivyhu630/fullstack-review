const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = new mongoose.Schema({
  username: String,
  repo_name: String,
  repo_id: { type: Number, unique: true},
  git_url: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data => {
  data.forEach(repo => {
    var username = repo.owner.login;
    var repo_name = repo.name;
    var repo_id = repo.id;
    var git_url = repo.html_url;
    var forks = repo.forks;
    repo = new Repo({ username, repo_name, repo_id, git_url, forks });
    repo.save(err => {
      if (err) {
        return handleError(err);
      }
    });
  });
});

let getTop25 = async function () {
  try {
    const repos = await Repo.find().sort({ forks: -1}).limit(25);
    // console.log (repos);
    return repos;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.save = save;
module.exports.getTop25 = getTop25;