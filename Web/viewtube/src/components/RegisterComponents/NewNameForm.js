// src/components/RegisterComponents/NameForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewNameForm = ({ firstName, setFirstName, lastName, setLastName}) => {
  return (
      <div className="mb-3">
        <input
          type="text"
          className={`form-control input-center`}
          id="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control input-center"
          id="lastName"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
  );
};

export default NewNameForm;
