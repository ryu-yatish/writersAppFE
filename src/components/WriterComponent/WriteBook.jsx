import React, { useState, useRef, useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";
import JoditEditor from "jodit-react";
import { fetchChapterById, saveChapterContent } from "../services/chapterService";
import CircularProgress from '@mui/material/CircularProgress';

import IconButton from '@mui/material/IconButton';
import ChatBox from "../ChatBox/ChatBox";
import { useParams } from "react-router-dom";

import "./WriteBook.css";

const WriteBook = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [config, setConfig] = useState({});
  const { darkMode } = useContext(DarkModeContext);
  const { bookId, chapterId } = useParams();
  const [lastAnalyzed, setLastAnalyzed] = useState("Analyze Book");

  const handleSave = async () => {
    try {
      console.log("Save successful:", title, content);
      await saveChapterContent(chapterId, { title, content });
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);
    handleSave(); // Optionally save when exiting edit mode
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEditTitle(false);
      handleSave(); // Optionally save when pressing Enter
    }
  };


  useEffect(() => {
    const fetchContent = async () => {
      try {
        const chapterData = await fetchChapterById(chapterId);
        setContent(chapterData.content);
        setTitle(chapterData.title);
        if(chapterData?.lastAnalyzed){
          const date = new Date(chapterData.lastAnalyzed);
          date.toLocaleString();
          setLastAnalyzed("last analyzed  : \n" +  date)
        }
      } catch (error) {
        console.error("Error fetching book content:", error);
      }
    };

    fetchContent();
  }, [chapterId]);

  useEffect(() => {
    setConfig(darkMode ? { theme: 'dark' } : {});
  }, [darkMode]);

  return (
    <div className="write-book-container">
      {editTitle ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyPress={handleTitleKeyPress}
          className="write-book-title-input"
          autoFocus
        />
      ) : (
        <h2 className="write-book-heading" onClick={() => setEditTitle(true)}>
          {title}
        </h2>
      )}
      <div className="editor-wrapper">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>
      <div>
      
      <ChatBox bookId={bookId} tooltipText={lastAnalyzed} />
      </div>
    </div>
  );
};

export default WriteBook;
