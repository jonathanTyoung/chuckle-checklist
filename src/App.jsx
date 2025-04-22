import React, { useEffect, useState } from "react";
import "./App.css";
import { postJoke, getAllJokes, updateJoke, deleteJoke } from "./services/JokeService.jsx";



export const App = () => {
  const [jokeInput, setJokeInput] = useState("");
  const [jokes, setJokes] = useState([])
  const [addJokeTrigger, setAddJokeTrigger] = useState(false); // trigger for adding a joke
  const [jokeToToggle, setJokeToToggle] = useState(null);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setJokes(jokesArray); // Correctly set the jokes state
      console.log("Jokes fetched and set!");
    });
  }, []); // ONLY runs on the initial render of the component

  // Event handler for adding a new joke
  // const handleAddJoke = () => {
  //   if (jokeInput.trim() !== "") {
  //     postJoke(jokeInput)
  //       .then((newJoke) => {
  //         setJokes((prevJokes) => [...prevJokes, newJoke]); // Add the new joke to the list
  //         setJokeInput(""); // Clear the input field
  //       })
  //       .catch((error) => {
  //         console.error("Error adding joke:", error);
  //       });
  //   }
  // };

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

  // Handle toggling the "told" status
  // useEffect(() => {
  //   if (jokeToToggle) {
  //     const updatedJoke = { ...jokeToToggle, told: !jokeToToggle.told };

  //     updateJoke(jokeToToggle.id, updatedJoke)
  //       .then(() => {
  //         setJokes((prevJokes) =>
  //           prevJokes.map((joke) =>
  //             joke.id === jokeToToggle.id ? updatedJoke : joke
  //           )
  //         );
  //         setJokeToToggle(null); // Reset the state
  //       })
  //       .catch((error) => {
  //         console.error("Error updating joke:", error);
  //       });
  //   }
  // }, [jokeToToggle]);

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

  const untoldJokes = jokes.filter((joke) => joke.told === false);
  const toldJokes = jokes.filter((joke) => joke.told === true);

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


      {/* Display Untold Jokes */}
      <div className="joke-lists-container">
        <h2>
          Untold Jokes <span className="untold-count">({untoldJokes.length})</span>
        </h2>
        <div className="untold-count">
          <ul>
            {untoldJokes.map((joke) => (
              <li className="joke-list-item " key={joke.id}
              >{joke.text}
                <button 
                  className="joke-list-action-toggle"
                  onClick={() => toggleToldStatus(joke.id)}
                >Mark as Told
                </button>
                {/* <button onClick={() => setJokeToToggle(joke)}>Mark as Told</button> */}
                <button
                  className="joke-list-action-delete" 
                  onClick={() => handleDeleteJoke(joke.id)}
                >Delete
                </button>
                {/* Add buttons for future functionality */}
              </li>
            ))}
          </ul>
        </div>


        {/* Display Told Jokes */}
        <div >
          <h2>
            Told Jokes <span className="told-count">({toldJokes.length})</span>
          </h2>
          <ul className="told-count">
            {toldJokes.map((joke) => (
              <li className="joke-list-item" key={joke.id}
              >{joke.text}
                <button 
                  className="joke-list-action-toggle"
                  onClick={() => toggleToldStatus(joke.id)}
                  >Mark as Untold
                </button>
                {/* <button onClick={() => setJokeToToggle(joke)}>Mark as Untold</button> */}
                <button
                  className="joke-list-action-delete" 
                  onClick={() => handleDeleteJoke(joke.id)}
                > Delete
                </button>
                {/* Add buttons for future functionality */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};