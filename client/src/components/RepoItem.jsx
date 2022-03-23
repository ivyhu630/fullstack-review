import React from 'react';

const RepoItem = (props) => {
  // console.log('this is a repo ',props);
  return (
    <li>
      username is {props.repo.username} and link to repo is
      <a href={props.repo.git_url}> {props.repo.repo_name}</a>
    </li>
  )
}

export default RepoItem;