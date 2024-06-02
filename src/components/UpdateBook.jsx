import React, { useState, useEffect } from "react";
import "../index.css"

const UpdateBook = ({ id, handleClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Book/getById/${id}`,
          {
            method: "GET",
          }
        );
        //i've left the debugger for you to test it out. hover over data to see thea actual value of it
        if (response.ok) {
            const data = await response.json(); 
           
            if (data != null && data.id!=null) {
              const bookName = data.bookName;
              const author = data.author;
              console.log("Fetched book details:", { bookName });
              setBookName(bookName);
              setAuthor(author);
            } else {
              console.error("Empty response or unexpected data structure");
            }
          } else {
            console.error("Failed to fetch book details");
          }
        } catch (error) {
          console.error("Error fetching book details:", error.message);
        }
      };
    if (id) {
        fetchBook();
      }
  }, [id]);
  // ID is not getting passed here. instead of this you can pass nothing and use the same method you used for author and bookname
  const handleUpdate = async (id) => {
    debugger
    const updatedBookData = {
        id: id,
        bookName: bookName,
        author: author
      };
      console.log("updatedBookData",updatedBookData)
    try {
    await fetch(
        `http://localhost:8080/Book/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*"
          },
          body: JSON.stringify(updatedBookData)
        }
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
    window.location.reload(false);
    handleClose();
  };

  return (
  <div className="popup-update">
    <h2>Update Book</h2>
    <label>Book Name:</label>
    <input
      type="text"
      value={bookName}
      onChange={(e) => setBookName(e.target.value)}
    />
    <label>Author:</label>
    <input
      type="text"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
    />
    <button onClick={() => handleUpdate(id)}>Update</button>
    <button onClick={handleClose}>Cancel</button>
</div>);
};

export default UpdateBook;
