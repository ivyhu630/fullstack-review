import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => {
  console.log('in report list', props.repos);
  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ol type='1' className='top25'>
      {/* <RepoItem repo={props.repos[0]}/> */}
      {props.repos.map((repo) =>
      <RepoItem repo={repo}/>
      )}
    </ol>
  </div>
)}

export default RepoList;