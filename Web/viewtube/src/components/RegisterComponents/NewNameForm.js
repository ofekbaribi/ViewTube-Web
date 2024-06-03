// src/components/RegisterComponents/NameForm.js
import React from 'react';
import '../../css/bootstrap.min.css';
import '../../pages/Login.css';

const NewNameForm = ({ firstName, setFirstName, lastName, setLastName, handleNameSubmit, error }) => {
  return (
    <form onSubmit={handleNameSubmit} className="position-relative">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control input-center ${error ? 'is-invalid' : ''}`}
          id="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {error && (
          <div className="invalid-tooltip">
            {error}
          </div>
        )}
      </div>
      <div className="mb-3">
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
      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  );
};

export default NewNameForm;
