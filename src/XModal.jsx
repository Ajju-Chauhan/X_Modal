import React, { useState } from "react";
import Modal from "react-modal";
import "./App.css";

// Set the root element for the modal to prevent accessibility issues
Modal.setAppElement("#root");

function XModal() {
  // State to control whether the modal is open or closed
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Form state variables to capture user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  // State to hold form validation errors
  const [errors, setErrors] = useState({});

  // Function to open the modal
  const openModal = () => setModalIsOpen(true);

  // Function to close the modal and reset the form fields
  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  // Function to reset the form fields and clear errors
  const resetForm = () => {
    setUsername("");
    setEmail("");
    setDob("");
    setPhone("");
    setErrors({});
  };

  // Function to validate the form inputs
  const validateForm = () => {
    const errors = {};

    // Username validation
    if (!username) {
      errors.username = "Username is required.";
    }

    // Email validation
    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email. Please check your email address.";
    }

    // Phone number validation
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }

    // Date of birth validation
    if (!dob) {
      errors.dob = "Date of birth is required.";
    } else if (new Date(dob) > new Date()) {
      alert("Invalid date of birth. Please enter a valid date.");
    }

    return errors;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    const validationErrors = validateForm();

    // If there are validation errors, set them in the state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Close the modal if the form is valid
    closeModal();
  };

  return (
    <div className="app">
      {/* Button to open the modal */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <h1>User Details Modal</h1>
      <button onClick={openModal} className="submit-button">Open Form</button>
      </div>

      {/* Modal component with custom styles */}
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default XModal;
