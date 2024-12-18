// Modal.js
import React from 'react';
import './Modal.css'; // Optional: Add your styles here

function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{message}</h3>
        <button onClick={onConfirm}>ยืนยัน</button>
        <button onClick={onClose}>ยกเลิก</button>
      </div>
    </div>
  );
}

export default Modal;
