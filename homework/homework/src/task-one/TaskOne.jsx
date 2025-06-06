import React from 'react';
import './TaskOne.css';
import useForm from './useForm'; // Импортируем наш хук

function TaskOne() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmitCallback = (formData) => {
    alert(JSON.stringify(formData));
  };

  const { values, error, handleChange, handleSubmit } = useForm(initialValues, onSubmitCallback);

  return (
    <div className="form-container">
      <div className="error-message">{error}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="form-input"
          value={values.firstName}
          onChange={handleChange('firstName')}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="form-input"
          value={values.lastName}
          onChange={handleChange('lastName')}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          value={values.email}
          onChange={handleChange('email')}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          value={values.password}
          onChange={handleChange('password')}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="form-input"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
        />
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
}

export default TaskOne;
