import { useEffect, useState } from "react"

export const getAllJokes = () => {
    return fetch(`http://localhost:8088/jokes`).then((res) => res.json())
}