import React from "react";

const UploaderDetails = ({ username, subscribers, profileImage }) => {
    return (
        <div className="d-flex align-items-center">
            <img src={profileImage} alt="Profile" className="rounded-circle" width="50" height="50" />
            <div className="ml-3">
                <h5 className="mb-0">{username}</h5>
                <small>{subscribers} subscribers</small>
            </div>
        </div>
    );
};

export default UploaderDetails;
