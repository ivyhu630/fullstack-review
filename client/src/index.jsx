import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    return axios.get('/repos')
      .then(result => {
      this.update(result.data);
    });
  }

  update(data) {
    this.setState({
      repos: data
    });
  }

  countUpdate(old, newd){
    var ct = 0;
    var oldIDs = [];
    var newIDs = [];
    old.forEach(e=> {
      oldIDs.push(e.repo_id);
    })
    newd.forEach(e=> {
      newIDs.push(e.repo_id);
    })

    let intersection = oldIDs.filter(x => newIDs.includes(x));
    ct = newd.length - intersection.length;
    return ct;
  }

  search (term) {
    console.log(`${term} was searched`);
    var data = {username: term};
    return axios.post('/repos', data)
    .then(result => {
      var updateNum = this.countUpdate(this.state.repos, result.data.data);
      this.update(result.data.data);
      window.alert(`${result.data.count}  new repos imported, ${updateNum} repos updated`);
    })
    .catch(err => console.log('there is a duplicate'));
  }

  render () {
    console.log("change");
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));