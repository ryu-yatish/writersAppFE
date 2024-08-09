import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import "./ChatBox.css"; // Ensure this file exists and has styles
import { analyzeBook } from "../services/embeddingService";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import Tooltip from '@mui/material/Tooltip';

const ChatBox = ({ bookId, tooltipText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipTextNew, setTooltipTextNew] = useState(tooltipText);
  const API_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL: "https://localhost:8080";
  useEffect(() => {
    setTooltipTextNew(tooltipText);
  }, [tooltipText]);

  const handleToggleChat = () => {
    console.log(responses);
    setIsOpen(!isOpen);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
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

  const handleSendMessage = async () => {
    setIsSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/Embeddings/askGpt/${bookId}`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Wrap message in an object
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text(); // Adjust this if your API returns JSON or another format
      setResponses([...responses, { question: message, answer: data }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chatbox-container">
      <IconButton className="chatbox-toggle" onClick={handleToggleChat}>
        {isOpen ? <CloseIcon fontSize="large" /> : <ChatIcon fontSize="large" />}
      </IconButton>
      <IconButton
        className="chatbox-toggle"
        onClick={handleAnalyze}
        disabled={isLoading}
      >
        <Tooltip title={tooltipTextNew}>
          {isLoading ? <CircularProgress size={35} /> : <LocationSearchingIcon fontSize="large" />}
        </Tooltip>
      </IconButton>
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {responses.length > 0 ? responses.map((res, index) => (
              <div key={index} className="chatbox-message">
                <div className="chatbox-question"><strong>Q:</strong> {res.question}</div>
                <div className="chatbox-answer"><strong>A:</strong> {res.answer}</div>
              </div>
            )) : <p>No messages yet.</p>}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              disabled={isSending}
            />
            <IconButton onClick={handleSendMessage} disabled={isSending || !message}>
              {isSending ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
