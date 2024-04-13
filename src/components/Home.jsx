import React, { useState } from "react";
import AddNote from "./AddNote";

const Home = () => {

  const [notes, setNotes] = useState([])

  return (
    <>
      <div>Home</div>
      <AddNote />
      <main>
        <ul>
          
        </ul>
      </main>
    </>
  );
};

export default Home;
