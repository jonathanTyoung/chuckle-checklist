import React, { useEffect, useState } from "react";
import "./App.css";
import { postJoke, getAllJokes, updateJoke, deleteJoke } from "./services/JokeService.jsx";
import { JokeList } from "./JokeList.jsx";



export const App = () => {
  const [jokeInput, setJokeInput] = useState("");
  const [jokes, setJokes] = useState([])
  const [addJokeTrigger, setAddJokeTrigger] = useState(false); // trigger for adding a joke
  const [jokeToToggle, setJokeToToggle] = useState(null);
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])


  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setJokes(jokesArray); // Correctly set the jokes state
      console.log("Jokes fetched and set!");
    });
  }, []); // ONLY runs on the initial render of the component
  
  useEffect(() => {
    if (jokes.length > 0){
    setUntoldJokes(jokes.filter((joke) => joke.told === false));
    setToldJokes(jokes.filter((joke) => joke.told === true));
    }
  }, [jokes])

  // Add a new joke whenever addJokeTrigger changes
  useEffect(() => {
    if (addJokeTrigger && jokeInput.trim() !== "") {
      postJoke(jokeInput)
        .then((newJoke) => {
          setJokes((prevJokes) => [...prevJokes, newJoke]); // Add the new joke to the list
          setJokeInput(""); // Clear the input field
        })
        .catch((error) => {
          console.error("Error adding joke:", error);
        })
        .finally(() => {
          setAddJokeTrigger(false); // Reset the trigger
        });
      }
    }, [addJokeTrigger, jokeInput]);

  const toggleToldStatus = (jokeId) => {
    const jokeToUpdate = jokes.find((joke) => joke.id === jokeId);
    if (jokeToUpdate) {
      const updatedJoke = { ...jokeToUpdate, told: !jokeToUpdate.told };

      // Update the joke in the database
      updateJoke(jokeId, updatedJoke)
        .then(() => {
          // Update the local state after the database is updated
          setJokes((prevJokes) =>
            prevJokes.map((joke) =>
              joke.id === jokeId ? updatedJoke : joke
            )
          );
        })
        .catch((error) => {
          console.error("Error updating joke:", error);
        });
    }
  };

  const handleDeleteJoke = (jokeId) => {
    deleteJoke(jokeId)
      .then(() => {
        // Remove the joke from the local state
        setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== jokeId));
      })
      .catch((error) => {
        console.error("Error deleting joke:", error);
      });
  };

  return (
    <div className="app-container">
      <div className="app-heading" >
        <h2>Chuckle Checklist</h2>
      </div>


      {/* Input for adding a new joke */}
      <div className="joke-add-form">
        <input
          type="text"
          placeholder="New One Liner"
          className="joke-input"
          value={jokeInput}
          onChange={(event) =>
            setJokeInput(event.target.value)}
        /><button
          className="joke-input-submit"
          // onClick={handleAddJoke}
          onClick={() => {
            if (jokeInput.trim() !== "") {
              setAddJokeTrigger(true)
            } // Set the trigger to true
          }}
        >Add Joke
        </button>
      </div>

        <JokeList 
        untoldJokes={untoldJokes} 
        toldJokes={toldJokes}
        toggleToldStatus={toggleToldStatus}
        handleDeleteJoke={handleDeleteJoke}
        />
      </div>
  );
};