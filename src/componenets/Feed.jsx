import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {category} = useParams();

  useEffect(() => {
    setLoading(true);
    if(category) {
      const query = searchQuery(category);
      client.fetch(query)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })
    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false)
      })
      .catch(error => {
        console.error(error, 'thsi is an error')
      })
    }
  }, [category])

  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>
  return (
    <div>{pins && <MasonryLayout pins={pins}/>}</div>
  )
}

export default Feed