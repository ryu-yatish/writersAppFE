import React, { useState, useEffect } from "react";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null)

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
    setBooks([...books, newBook])
    setShowAddBookPopup(false)
  }

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(
        `http://ec2-54-234-159-247.compute-1.amazonaws.com:8080/Book/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the deleted book from the state
        setBooks(books.filter((book) => book.id !== id))
      } else {
        console.error(`Failed to delete book with id ${id}`);
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const handleUpdatePopup = (id) => {
      setShowUpdatePopup(true);
      setSelectedBookId(id);
  }
  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedBookId(null);
  };

  return (
    <>
      <div><h1>List of books:</h1></div>
      <button onClick={() => setShowAddBookPopup(true)}>Add Book</button>
      {showAddBookPopup &&
      <AddBook onAdd={handleAddBook} onClose={()=> setShowAddBookPopup(false)}/>}
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
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdatePopup(book.id)}>Update entry</button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
      {showUpdatePopup && (<UpdateBook id={selectedBookId} handleClose={closeUpdatePopup}/>)}
    </>
  );
};

export default Home;
