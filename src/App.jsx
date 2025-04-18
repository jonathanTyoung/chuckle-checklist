import React, { useState } from "react";
import "./App.css";
import { getAllJokes } from "./services/JokeService";

export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [jokeInput, setJokeInput] = useState("");

  return (
    <div className="app-container">
      <h1>Chuckle Checklist</h1>

      {/* Input for adding a new joke */}
      <input
        type="text"
        placeholder="New One Liner"
        className="joke-input"
        value={jokeInput}
        onChange={(event) => 
          setJokeInput(event.target.value)}
      /> 
    </div>
  );
};