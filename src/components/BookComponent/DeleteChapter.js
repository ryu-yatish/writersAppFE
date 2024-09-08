import React from 'react';
import { deleteChapterById } from '../services/chapterService';
import '../../App.css';

const DeleteChapter = ({ id,book, closePopup, setBook }) => {
  const handleDelete = async (id) => {
    try {
      const response = await deleteChapterById(id);
      if (response.status==204) {
        setBook((book) => ({
          ...book,
          chapters: book.chapters.filter((chapter) => chapter.id !== id),
          chapterCount: book.chapterCount - 1,
        }));
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
        <h3>Are you sure you want to delete this chapter?</h3>
        <h5>Entry will be permanently deleted.</h5>
        <div className="button-group">
          <button className="delete-btn" onClick={() => handleDelete(id)}>Delete</button>
          <button className="cancel-btn" onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChapter;
