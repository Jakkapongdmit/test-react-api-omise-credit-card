import React, { useState } from 'react';
import Modal from './Modals/DataTableModal'; // Adjust the import path based on your folder structure

import { deleteData } from '../api';

function DataTable({ data, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    if (selectedId) {
      console.log('====================================');
      console.log("selectedId >>",selectedId);
      console.log('====================================');
      onDelete(selectedId);
      closeModal();
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => openModal(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Delete Product!"
      />
    </>
  );
}

export default DataTable;
