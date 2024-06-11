import React, { useState, useEffect } from 'react';
import RelatedVideoItem from './RelatedVideoItem';
import { useVideos } from '../../contexts/VideosContext';


function RelatedVideos() {
  const [videosList, setVideosList] = useState([]);
  const { videos } = useVideos();

  useEffect(() => {
    setVideosList(videos);
  }, []);

  return (
    <div >
      {videosList.map((video) => (
        <RelatedVideoItem {...video} />
      ))} 
    </div>
  );
}

export default RelatedVideos;