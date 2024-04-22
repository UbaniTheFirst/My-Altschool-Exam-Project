import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageNotFound from './404page';

const RepositoryDetails = () => {
  const { repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null); // State to store owner details
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Fetch details of the repository with repoName
    fetch(`https://api.github.com/repos/Pokah1/${repoName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repository details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched repo details:', data);
        setRepoDetails(data);
        fetchOwnerDetails(data.owner.login); // Fetch owner details
      })
      .catch(error => {
        console.error('Error fetching repository details: ', error);
        setNotFound(true);
      });
  }, [repoName]);

  // Function to fetch owner details
  const fetchOwnerDetails = (ownerLogin) => {
    fetch(`https://api.github.com/users/${ownerLogin}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch owner details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched owner details:', data);
        setOwnerDetails(data);
      })
      .catch(error => {
        console.error('Error fetching owner details: ', error);
      });
  };

  if (notFound) {
    return <PageNotFound />;
  }

  if (!repoDetails || !ownerDetails) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h2>{repoDetails.name}</h2>
      <p>{repoDetails.description}</p>
      <p>Language: {repoDetails.language}</p>
      <p>Stars: {repoDetails.stargazers_count}</p>
      <p>Forks: {repoDetails.forks_count}</p>
      <p>Last Updated: {repoDetails.updated_at}</p>
      <p>License: {repoDetails.license ? repoDetails.license.name : 'N/A'}</p>
      <p>Repository URL: <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">{repoDetails.html_url}</a></p>

      {/* Display owner details */}
      <aside>
        <h3>Owner Details</h3>
        <p>Username: {ownerDetails.login}</p>
        <img src={ownerDetails.avatar_url} alt="Owner Avatar" />
        <p>Profile: <a href={ownerDetails.html_url} target="_blank" rel="noopener noreferrer">{ownerDetails.html_url}</a></p>
      </aside>
      
      <Link to="/repos"><button>Return to Fetch Repos</button></Link>
    </article>
  );
};

export default RepositoryDetails;
