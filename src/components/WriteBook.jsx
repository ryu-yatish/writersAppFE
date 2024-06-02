import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const WriteBook = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      console.log("Save successful:", content);

    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <>
      <div>WriteBook</div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default WriteBook;
