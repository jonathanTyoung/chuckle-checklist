export const JokeList = ({ untoldJokes, toggleToldStatus, handleDeleteJoke, toldJokes }) => {
    return (
        <div className="joke-lists-container">
            <div className="joke-list-container">
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
            </div>


            {/* Display Told Jokes */}
            <div className="joke-list-container">
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
    )
}