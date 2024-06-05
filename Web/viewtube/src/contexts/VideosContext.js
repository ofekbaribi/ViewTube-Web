import { useState } from 'react';

const useVideos = () => {
  const [videos, setVideos] = useState([]);

  const addVideo = (video) => {
    const updatedVideos = [...videos, video];
    setVideos(updatedVideos);
  };

  return { videos, addVideo };
};

export default useVideos;
