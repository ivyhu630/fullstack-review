import React from 'react';

const RepoItem = (props) => {
  // console.log('this is a repo ',props);
  return (
    <li>
      username is {props.repo.username} and link to repo is
      <a href={props.repo.git_url}> link to repo</a>
    </li>
  )
}

export default RepoItem;