import React from "react";
import { Link } from 'react-router-dom';
import "../../css/bootstrap.min.css";
import "./UploaderDetails.css";

const UploaderDetails = ({ username, subscribers, profileImage }) => {
  return (
    <div className="d-flex align-items-center">
      {/* Profile Image */}
      <Link to={`/profile/${encodeURIComponent(username)}`} className="no-link-style">
      <img
        src={profileImage}
        alt="Uploader's profile"
        className="rounded-circle profile-picture"
        width="50"
        height="50"
      />
      </Link>
      {/* Uploader's Details */}
      <div className="ml-3">
        <Link to={`/profile/${encodeURIComponent(username)}`} className="no-link-style">
          <h5 className="mb-0 author-name">{username}</h5>
        </Link>
        <small>{subscribers} subscribers</small>
      </div>
    </div>
  );
};

export default UploaderDetails;
