import React from 'react'
import "../index.css"

const DeleteBook = ({ id, books, closePopup, setBooks }) => {
    const handleDelete = async (id) => {
        try {
          const response = await fetch(
            `http://ec2-54-234-159-247.compute-1.amazonaws.com:8080/Book/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            setBooks(books.filter((book) => book.id !== id));
          } else {
            console.error(`Failed to delete book with id ${id}`);
          }
        } catch (error) {
          console.error("Error deleting data:", error.message);
        }
      };
  return (
    <div className='popup-delete'>
        <h2>CONFIRM DELETE</h2>
        <h3>Are you sure you want to delete this book?</h3>
        <h5>Entry will be permanently deleted.</h5>
        <button onClick={() => handleDelete(id)}>Delete</button>
        <button onClick={closePopup}>Cancel</button>
    </div>
  )
}

export default DeleteBook