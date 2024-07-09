import React from 'react';
import '../../css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import './EditOptionsModal.css';

const NewNameForm = ({ firstName, setFirstName, lastName, setLastName, nameError, setNameError }) => {
  
  // Function to handle first name input change
  const handleNameChange = (e) => {
    setFirstName(e.target.value); // Update the state with the new first name
    if (nameError) {
      setNameError(''); // Clear name error if it exists
    }
  };

  // Function to handle last name input change
  const handleLastNameChange = (e) => {
    setLastName(e.target.value); // Update the state with the new last name
    if (nameError) {
      setNameError(''); // Clear name error if it exists
    }
  };
  
  return (
    <div className="mb-3">
      {/* Input for first name */}
      <label htmlFor="firstName" className="form-label">First Name</label>
      <input
        type="text"
        className={`form-control`}
        id="firstName"
        placeholder="First name"
        value={firstName}
        onChange={handleNameChange}
        required
      />
      
      {/* Input for last name */}
      <label htmlFor="lastName" className="form-label last-name-modal">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="lastName"
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
        required
      />
      
      {/* Display nameError if it exists */}
      {nameError && (
        <div className="invalid-tooltip">
          {nameError}
        </div>
      )}
    </div>
  );
};

export default NewNameForm;
