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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!formData.username) {
      errors.formData.username = "Username is required.";
    }
    if (!formData.email) {
      errors.formData.email = "Email is required.";
    } else if (!email.includes('@')) {
      errors.email = "Invalid email. Please check your email address.";
    }
    if (!formData.phone) {
      
    } else if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if (!formData.dob) {
      errors.formData.dob = "Date of birth is required.";
    } else if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Please enter a valid date.");
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
              </label>
              <label>
                Email:
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone Number:
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Date of Birth:
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
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
