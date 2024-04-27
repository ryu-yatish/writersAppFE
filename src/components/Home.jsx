import React, { useState, useEffect } from "react";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../index.css";
import DeleteBook from "./DeleteBook";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [deleteID, setDeleteID] = useState(null)

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-234-159-247.compute-1.amazonaws.com:8080/Book/all",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
    setShowAddBookPopup(false);
  };

  const handleDeletePopup = (id) => {
    setShowDeletePopup(true)
    setDeleteID(id)
  }

  const handleUpdatePopup = (id) => {
    setShowUpdatePopup(true);
    setSelectedBookId(id);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false)
    setDeleteID(null)
  }

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedBookId(null);
  };

  return (
    <>
      <div>
        <h1>List of books:</h1>
      </div>
      <button onClick={() => setShowAddBookPopup(true)}>Add Book</button>
      {showAddBookPopup && (
        <AddBook
          onAdd={handleAddBook}
          onClose={() => setShowAddBookPopup(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Chapter Count</th>
            <th>Chapters</th>
            <th>DELETE</th>
            <th>UPDATE</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.bookName}</td>
              <td>{book.author}</td>
              <td>{book.chapterCount}</td>
              <td>{book.chapters}</td>
              <td>
                <IconButton onClick={() => handleDeletePopup(book.id)} aria-label="delete" color="error" size="large">
                  <DeleteIcon />
                </IconButton>
                
              </td>
              <td>
                <button onClick={() => handleUpdatePopup(book.id)}>
                  Update entry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdatePopup && (
        <UpdateBook id={selectedBookId} handleClose={closeUpdatePopup} />
      )}
      {showDeletePopup && 
      (<DeleteBook id={deleteID} books={books} setBooks={setBooks} closePopup={closeDeletePopup}/>)}
    </>
  );
};

export default Home;
