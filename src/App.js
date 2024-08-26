import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: '',  // Clear the error when user starts typing
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate the form fields
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes('@')) {
      newErrors.email = "Invalid email. Please check your email address.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    } else if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Date cannot be in the future.");
    }

    // Set errors if any and prevent modal close if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all validations pass, close the modal
    closeModal();
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <h1>User Details Modal</h1>
        <button onClick={openModal} className="submit-button">Open Form</button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </label>
              <label>
                Email:
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </label>
              <label>
                Phone Number:
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </label>
              <label>
                Date of Birth:
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
