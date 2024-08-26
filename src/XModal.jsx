import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function XModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setDob('');
    setPhone('');
    setErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required.";
    }
    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.includes('@')) {
      errors.email = "Invalid email. Please check your email address.";
    }
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      errors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
    }
    if (!dob) {
      errors.dob = "Date of birth is required.";
    } else if (new Date(dob) > new Date()) {
      errors.dob = "Invalid date of birth. Please enter a valid date.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    closeModal();
  };

  return (
    <div className="app">
      <button onClick={openModal}>Open Form</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="overlay"
      >
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && <p>{errors.dob}</p>}
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </Modal>
    </div>
  );
}

export default XModal;
