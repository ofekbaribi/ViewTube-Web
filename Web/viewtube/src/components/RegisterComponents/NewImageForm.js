import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewImageForm = ({ setImage, setImagePreview, imagePreview }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Upload profile Picture</label>
      <div className="input-group">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div className="mt-3 image-preview-container">
          <img src={imagePreview} alt="Profile Preview" className="img-thumbnail" />
        </div>
      )}
    </div>
  );
};

export default NewImageForm;
