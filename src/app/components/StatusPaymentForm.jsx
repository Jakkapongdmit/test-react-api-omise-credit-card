import React, { useState } from 'react';

const StatusPaymentForm = ({ onCheckStatus }) => {
  const [formData, setFormData] = useState({
    id:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckStatus(formData);
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>Create Payment Link</h3>

      <div className="form-group">
        <label>link_id:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <button className="submit-btn" type="submit">Status Payment</button>
    </form>
  );
};

export default StatusPaymentForm;
