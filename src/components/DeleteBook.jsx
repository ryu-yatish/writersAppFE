import React from 'react';
import { deleteBookById } from './services/bookService';
import '../App.css';

const DeleteBook = ({ id, books, closePopup, setBooks }) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteBookById(id);
      if (response.status===204) {
        setBooks(books.filter((book) => book.id !== id));
      } else {
        console.error(`Failed to delete book with id ${id}`);
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      closePopup();
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>CONFIRM DELETE</h2>
        <h3>Are you sure you want to delete this book?</h3>
        <h5>Entry will be permanently deleted.</h5>
        <div className="button-group">
          <button className="delete-btn" onClick={() => handleDelete(id)}>Delete</button>
          <button className="cancel-btn" onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
