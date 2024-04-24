import React, { useState, useEffect } from "react";

const UpdateBook = ({ id, handleClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://ec2-54-234-159-247.compute-1.amazonaws.com:8080/Book/getById/${id}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
            const data = await response.json(); 
            if (data && data.length > 0) {
              const { bookName, author } = data[0];
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

  const handleUpdate = async (id) => {
    const updatedBookData = {
        id: id,
        bookName: bookName,
        author: author
      };
    try {
    await fetch(
        `http://ec2-54-234-159-247.compute-1.amazonaws.com:8080/Book/${id}`,
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
  <div>
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
    <button onClick={handleUpdate}>Update</button>
    <button onClick={handleClose}>Cancel</button>
</div>);
};

export default UpdateBook;
