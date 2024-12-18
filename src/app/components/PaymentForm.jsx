import React, { useState } from 'react';
import '../components/css/PaymentForm.css'; // ไฟล์ CSS สำหรับจัดการสไตล์

const PaymentForm = ({ onCreateLink }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    currency: 'thb',
    description: '',
    buyer_name: '',
    reference_order: '',
    expires_at: '',
    charges: [], // เปลี่ยน charges เป็นอาร์เรย์ว่าง
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChargeChange = (index, e) => {
    const { name, value } = e.target;
    const newCharges = [...formData.charges];
    newCharges[index][name] = value;
    setFormData({ ...formData, charges: newCharges });
  };

  const addCharge = () => {
    setFormData({
      ...formData,
      charges: [...formData.charges, { amount: '', currency: 'thb', description: '' }],
    });
  };

  const removeCharge = (index) => {
    const newCharges = formData.charges.filter((_, i) => i !== index);
    setFormData({ ...formData, charges: newCharges });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ส่ง formData แม้ว่าจะไม่มี charges
    onCreateLink(formData);
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>Create Payment Link</h3>

      {/* Fields for title, amount, currency, description, buyer_name, reference_order, expires_at */}
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter title"
        />
      </div>

      <div className="form-group">
        <label>Total Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
          placeholder="Enter total amount"
        />
      </div>

      <div className="form-group">
        <label>Currency:</label>
        <input
          type="text"
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          placeholder="Enter description"
        />
      </div>

      <div className="form-group">
        <label>Buyer Name:</label>
        <input
          type="text"
          name="buyer_name"
          value={formData.buyer_name}
          onChange={handleInputChange}
          placeholder="Enter buyer's name"
        />
      </div>

      <div className="form-group">
        <label>Reference Order:</label>
        <input
          type="text"
          name="reference_order"
          value={formData.reference_order}
          onChange={handleInputChange}
          placeholder="Enter reference order"
        />
      </div>

      <div className="form-group">
        <label>Expiration Date:</label>
        <input
          type="datetime-local"
          name="expires_at"
          value={formData.expires_at}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="charges-section">
        <h4>Charges (Optional)</h4>
        <p>You can add multiple charge items below (optional).</p>
        {formData.charges.map((charge, index) => (
          <div key={index} className="charge-item">
            <div className="form-group">
              <label>Item Amount:</label>
              <input
                type="number"
                name="amount"
                value={charge.amount}
                onChange={(e) => handleChargeChange(index, e)}
                placeholder="Amount"
              />
            </div>
            <div className="form-group">
              <label>Item Currency:</label>
              <input
                type="text"
                name="currency"
                value={charge.currency}
                onChange={(e) => handleChargeChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label>Item Description:</label>
              <input
                type="text"
                name="description"
                value={charge.description}
                onChange={(e) => handleChargeChange(index, e)}
                placeholder="Description"
              />
            </div>
            <button type="button" onClick={() => removeCharge(index)} className="remove-charge-btn">
              Delete Charge
            </button>
          </div>
        ))}
        <button type="button" onClick={addCharge} className="add-charge-btn">
          Add Another Item
        </button>
      </div>

      <button className="submit-btn" type="submit">
        Create Payment Link
      </button>
    </form>
  );
};

export default PaymentForm;
