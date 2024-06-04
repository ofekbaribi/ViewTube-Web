import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewImageForm = ({ image, setImage }) => {
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="input-group custom-file-button mb-3">
      <label className="input-group-text mb-3" htmlFor="inputGroupFile">Profile Picture</label>
      <input 
        type="file" 
        className="form-control" 
        id="inputGroupFile"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default NewImageForm;
