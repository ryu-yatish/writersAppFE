import React, { useState, useEffect } from "react";
import "../App.css"
import { fetchBookById,updateBook } from "./services/bookService";
const UpdateBook = ({ id, handleClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    
    const fetchBook = async () => {
      try {
        const data = await fetchBookById(id)
           
        if (data != null && data.id!=null) {
          const bookName = data.bookName;
          const author = data.author;
          console.log("Fetched book details:", { bookName });
          setBookName(bookName);
          setAuthor(author);
        } else {
          console.error("Empty response or unexpected data structure");
        }
        
        } catch (error) {
          console.error("Error fetching book details:", error.message);
        }
    }
    if (id) {
        fetchBook();
      }
  }, [id]);

  const handleUpdate = async (id) => {
    const updatedBookData = {
        id: id,
        bookName: bookName,
        author: author
      };
      console.log("updatedBookData",updatedBookData)
    try {
    await updateBook(id,updatedBookData)
    } catch (error) {
      console.error("Error updating book:", error);
    }
    window.location.reload(false);
    handleClose();
  };

  return (
    <div className="popup">
    <div className="popup-inner">
      <h2>Update Book</h2>
      <div className="form-group">
        <label>Book Name:</label>
        <input
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button className="update-btn" onClick={() => handleUpdate(id)}>Update</button>
        <button className="cancel-btn" onClick={handleClose}>Cancel</button>
      </div>
    </div>
    </div>
    )
};

export default UpdateBook;
