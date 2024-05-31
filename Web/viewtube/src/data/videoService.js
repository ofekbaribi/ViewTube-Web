import videos from './db.json';

export const fetchVideosList = async () => {
  return videos;
};

export const fetchVideoDetails = async (videoId) => {
  return videos.find(video => video.id === parseInt(videoId, 10));
};