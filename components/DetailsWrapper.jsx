import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RepositoryDetails from './RepositoryDetails';

const DetailsWrapper = () => {
  const { repoName } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/Pokah1/${repoName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repository details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched repo details:', data);
        setRepository(data);
      })
      .catch(error => {
        console.error('Error fetching repository details: ', error);
      });
  }, [repoName]);

  return <RepositoryDetails repo={repository} />;
};

export default DetailsWrapper;
