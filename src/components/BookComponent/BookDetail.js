import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { fetchBookById } from "../services/bookService";
import AddChapter from "../AddChapter";
import AddSchema from "../AddSchema";
import DeleteChapter from "./DeleteChapter";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { Suspense, lazy } from 'react';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showAddChapterPopup, setShowAddChapterPopup] = useState(false);
  const [showAddSchemaPopup, setShowAddSchemaPopup] = useState(false);
  const [showDeleteChapterPopup, setShowDeleteChapterPopup] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const navigate = useNavigate();
  const fetchBook = async () => {
    try {
      const data = await fetchBookById(id);
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  

  const handleAddChapter = (newChapter) => {
    setBook((prevBook) => ({
      ...prevBook,
      chapters: [...prevBook.chapters, newChapter],
      chapterCount: prevBook.chapterCount + 1,
    }));
  };

  const handleAddSchema = (newSchema) => {
    setBook((prevBook) => ({
      ...prevBook,
      dynamicDbSchemaList: [...prevBook.dynamicDbSchemaList, newSchema]
    }));
  };
  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <div className="header">
        <h1>{book.bookName}</h1>
        <p><strong>Author:</strong> {book.author}</p>
      </div>
      <div className="header-sub">
        <p><strong>Chapter Count:</strong> {book.chapterCount}</p>
        <h2>Chapters</h2>
        <button className="add-book-btn" onClick={() => setShowAddChapterPopup(true)}>Add Chapter</button>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Last Modified</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {book.chapters.map((chapter, index) => (
            <tr key={chapter.id} onClick={() => navigate(`/write/${book.id}/${chapter.id}`)}>
              <td>{index + 1}</td>
              <td>{chapter.title}</td>
              <td>{new Date(chapter.lastModified).toLocaleDateString()}</td>
              <td>
                <IconButton className="ignore-click" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChapterId(chapter.id);
                    setShowDeleteChapterPopup(true);
                  }} aria-label="delete" color="error" size="large">
                <DeleteIcon />
              </IconButton>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {showAddChapterPopup && (
        <AddChapter
          bookId={id}
          onAdd={handleAddChapter}
          onClose={() => setShowAddChapterPopup(false)}
        />
      )}
      {showAddSchemaPopup && (
        <AddSchema
          bookId={id}
          onAdd={handleAddSchema}
          onClose={() => setShowAddSchemaPopup(false)}
        />
      )}
      {showDeleteChapterPopup && (
        <DeleteChapter
          id={selectedChapterId}
          closePopup={() => setShowDeleteChapterPopup(false)}
          setBook={setBook}
          book={book}
        />
      )}
      <div className="horizontal-icons">
    <IconButton className="chatbox-toggle" onClick={() => setShowAddSchemaPopup(true)}>
        <AddIcon fontSize="large" />
      </IconButton>
      {/* {book.dynamicDbSchemaList.map((dbSchema, index) => {
        const image =dbSchema.icon;
        return (
            <div>
              <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} />
            </div>
        )
      })} */}
    </div>
    </div>
  );
};

export default BookDetail;
