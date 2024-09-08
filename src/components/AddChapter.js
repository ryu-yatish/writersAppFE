import React, { useState } from "react";
import { addChapterApi } from "./services/chapterService";
import "../App.css"

const AddChapter = ({ bookId, onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = addChapterApi(bookId,formData)

      const newChapter = await response;
      onAdd(newChapter);
      
      setFormData({
        title: "",
        content: "",
      });

      onClose();

    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => onClose()}>&times;</button>
        <h2>Add New Chapter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChapter;
