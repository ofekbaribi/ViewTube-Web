// src/components/RegisterComponents/NameForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewNameForm = ({ firstName, setFirstName, lastName, setLastName, nameError, setNameError}) => {
  const handleNameChange = (e) => {
    setFirstName(e.target.value);
    if (nameError) {
      setNameError('');
    }
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (nameError) {
      setNameError('');
    }
  }
  
  return (
      <div className="mb-3">
        <input
          type="text"
          className={`form-control input-center`}
          id="firstName"
          placeholder="First name"
          value={firstName}
          onChange={handleNameChange}
          required
        />
        <input
          type="text"
          className="form-control input-center"
          id="lastName"
          placeholder="Last name"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        {nameError && (
          <div className="invalid-tooltip">
            {nameError}
          </div>
        )}
      </div>
  );
};

export default NewNameForm;
