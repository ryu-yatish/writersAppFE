import React from "react";
import { useState } from "react";
import '../index.css'

const AddBook = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    chapterCount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/Book/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });  

      onAdd(formData);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setFormData({
        bookName: "",
        author:"",
        chapterCount: 0,
      });

      onClose()

    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };

  return (
    <>
      <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => onClose()}>
          X
        </button>
        <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input type="text" name="bookName" required value={formData.bookName} onChange={handleInputChange}/>
        </label>
        <label>
          Author:
          <input type="text" name="author" required value={formData.author} onChange={handleInputChange}/>
        </label>
        <label>
          Chapter Count:
          <input type="text" name="chapterCount" required value={formData.chapterCount} onChange={handleInputChange}/>
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>
    </>
  );
};

export default AddBook;
