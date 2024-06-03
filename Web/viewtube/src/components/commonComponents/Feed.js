import React from 'react';
import VideoList from '../homePage/VideoList'; 
import './Feed.css'; 
const Feed = ({ searchQuery }) => {
    return (
        <div className="feed">
            <VideoList searchQuery={searchQuery} />
        </div>
    );
};

export default Feed;

import React from 'react'
import './Feed.css'

const Feed = () => {
    return (
        <div>

        </div>
    )
}

export default Feed

