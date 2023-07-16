import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const cookieMonster = () => {
    fetch("http://localhost:8000/set-cookies-again", {
      credentials: "include",
    });
  };
  useEffect(() => {
    fetch("http://localhost:8000/set-cookies", {
      method: "GET",
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        // Handle the response, if needed
      })
      .catch((error) => {
        // Handle any errors
      });
  });
  return (
    <div>
      <h1>Hello world</h1>
      <button
        onClick={() => {
          cookieMonster();
        }}
      >
        click me to change cookie
      </button>
    </div>
  );
}

export default App;
