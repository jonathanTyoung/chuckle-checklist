export const getAllJokes = async () => {
    return fetch(`http://localhost:8088/jokes`).then((res) => res.json())
}

export const postJoke = async (text) => {
    const response = await fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, told: false }),
    });

    if (!response.ok) {
        throw new Error("Failed to add joke");
    }

    return response.json();
};

export const updateJoke = async (jokeId, updatedJoke) => {
    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJoke),
    });

    if (!response.ok) {
        throw new Error("Failed to update joke");
    }

    return response.json();
};