import React from "react";
import JoditEditor from "jodit-react";

const WriteBook = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  return (
    <>
      <div>WriteBook</div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </>
  );
};

export default WriteBook;
