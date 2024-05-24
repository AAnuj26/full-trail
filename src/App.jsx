import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const fetchUserData = async () => {
    const response = await fetch("/api/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error);
      });
    return setData(response);
  };

  return (
    <>
      <div>{data ? <div>{JSON.stringify(data)}</div> : "Loading data..."}</div>
      <button onClick={fetchUserData}>User</button>
    </>
  );
}

export default App;
