import React, { useState } from 'react';

function AddForm({ onAdd }) {
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputPrice, setInputPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim() && inputDescription.trim() && parseFloat) {
      onAdd({
        name: inputName,
        description: inputDescription,
        price: parseFloat(inputPrice)
      });
      setInputName('');
      setInputDescription('');
      setInputPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        type="text"
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
        placeholder="Enter Description"
      />
      <input
        type="number"
        value={inputPrice}
        onChange={(e) => setInputPrice(e.target.value)}
        placeholder="Enter Price"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddForm;
