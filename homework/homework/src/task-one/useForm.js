import { useState } from 'react';

function useForm(initialValues, onSubmitCallback) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState('');

  // Валидация email по паттерну
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Обработчик изменения поля
  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  // Валидация формы
  const validate = () => {
    const { firstName, lastName, email, password, confirmPassword } = values;

    if (!firstName.trim() || !lastName.trim()) {
      setError('First Name and Last Name cannot be empty.');
      return false;
    }

    if (!emailPattern.test(email)) {
      setError('Invalid email address.');
      return false;
    }

    if (password.length < 5 || !/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) {
      setError('Password must be at least 5 characters long and include numbers and special symbols.');
      return false;
    }

    if (confirmPassword !== password) {
      setError('Confirm Password must match Password.');
      return false;
    }

    setError('');
    return true;
  };

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Передача данных для обработки
      onSubmitCallback(values);

      // Очистка полей после успешной отправки
      setValues(initialValues);
    }
  };

  return {
    values,
    error,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
