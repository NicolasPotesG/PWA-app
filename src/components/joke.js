import React, { useEffect, useState } from "react";

const Joke = () => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("joke") === null) {
        setJoke("Error while connecting with API. Try again.");
      } else {
        setJoke(localStorage.getItem("joke"));
      }
    } else {
      const URL = "https://api.chucknorris.io/jokes/random";
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setJoke(res.value);
          localStorage.setItem("joke", res.value);
        });
    }
  }, []);

  return (
    <div>
      <h1>Joke</h1>
      <p>{joke}</p>
    </div>
  );
};

export default Joke;