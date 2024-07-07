import React, { useState, useEffect } from "react";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css"
import DeleteBook from "./DeleteBook";
import { fetchBooks } from "./services/bookService";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState(null);
  
  const [deleteID, setDeleteID] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchBooks();
  }, []);

  const handleFetchBooks = async () => {
    try {
      const books = await fetchBooks();
      setBooks(books)
      console.log("Books fetched successfully:", books);

    } catch (error) {
      console.error("Error occurred while fetching books:", error);

    }
  };

  const handleAddBook = (newBook) => {
    handleFetchBooks()
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
    <div className="header">
      <h1>List of Books</h1>
      <button className="add-book-btn" onClick={() => setShowAddBookPopup(true)}>Add Book</button>
    </div>
    
    <table className="book-table">
      <thead>
        <tr>
          <th>Book Title</th>
          <th>Author</th>
          <th>Chapter Count</th>
          <th>DELETE</th>
          <th>UPDATE</th>
        </tr>
      </thead>
      <tbody>
        {books?.map((book) => (
          <tr key={book.id} onClick={(e) => {
            if (!e.target.closest('.ignore-click')) {
              navigate(`/book/${book.id}`);
            }
          }}>
            <td>{book.bookName}</td>
            <td>{book.author}</td>
            <td>{book.chapterCount}</td>
            <td>
              <IconButton className="ignore-click" onClick={() => handleDeletePopup(book.id)} aria-label="delete" color="error" size="large">
                <DeleteIcon />
              </IconButton>
            </td>
            <td>
              <button  className="update-btn  ignore-click" onClick={() => handleUpdatePopup(book.id)}>
                Update
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {showAddBookPopup && (
      <AddBook
        onAdd={handleAddBook}
        onClose={() => setShowAddBookPopup(false)}
      />
    )}
    {showUpdatePopup && (
      <UpdateBook id={selectedBookId} handleClose={closeUpdatePopup} />
    )}
    {showDeletePopup && 
    (<DeleteBook id={deleteID} books={books} setBooks={setBooks} closePopup={closeDeletePopup}/>)}
  </>
  );
};

export default Home;
