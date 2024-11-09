import React, { useState, useRef, useEffect, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";
import JoditEditor from "jodit-react";
import { fetchChapterById, saveChapterContent } from "../services/chapterService";
import CircularProgress from '@mui/material/CircularProgress';
import { analyzeBook } from "../services/embeddingService";

import IconButton from '@mui/material/IconButton';
import ChatBox from "../ChatBox/ChatBox";
import { useParams } from "react-router-dom";
import Sidebar from "../SidebarComponent/sidebar";
import "./WriteBook.css";
import Tooltip from '@mui/material/Tooltip';

const WriteBook = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [config, setConfig] = useState({});
  const { darkMode } = useContext(DarkModeContext);
  const { bookId, chapterId } = useParams();
  const [lastAnalyzed, setLastAnalyzed] = useState("Analyze Book");
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipTextNew, setTooltipTextNew] = useState("");

  const handleSave = async () => {
    try {
      console.log("Save successful:", title, content);
      setIsLoading(true);
      await saveChapterContent(chapterId, { title, content });
      await handleAnalyze()
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
  const handleAnalyze = async () => {
    try {
      await analyzeBook(bookId);
      const date = new Date();
      const formattedDate = date.toLocaleString();
      setTooltipTextNew("Last analyzed: " + formattedDate);
    } catch (error) {
      console.error("Error analyzing book:", error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    const fetchContent = async () => {
      try {
        const chapterData = await fetchChapterById(chapterId);
        setContent(chapterData.content);
        setTitle(chapterData.title);
        if (chapterData?.lastAnalyzed) {
          const date = new Date(chapterData.lastAnalyzed);
          date.toLocaleString();
          setLastAnalyzed("last analyzed  : \n" + date)
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

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (content || title) {  // Only save if there's content or title to save
        handleSave();
      }
    }, 5 * 60 * 1000);  // 5 minutes in milliseconds

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(autoSaveInterval);
  }, [content, title]);  // Re-create interval when content or title changes

  return (
    <div className="page-container">
      <div>
      <Sidebar bookId={bookId} />
      </div>
      
      <div className="main-content">
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
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
       
        <div>

          <ChatBox bookId={bookId} tooltipText={lastAnalyzed} />
          <button className="save-button" onClick={handleSave}>
          <Tooltip title={tooltipTextNew}>
          {isLoading ? <CircularProgress size={24} /> : <span>save</span>}
          </Tooltip>
          </button>
        </div>
      </div>

      
    </div>
    
  );
};

export default WriteBook;
