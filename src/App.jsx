import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postData, setPostData] = useState(null);
  const [getData, setGetData] = useState(null);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("age", age);
  formData.append("email", email);
  formData.append("password", password);

  const fetchUserData = async () => {
    try {
      const gettingData = await fetch("/api/v1/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((gotData) => {
        return gotData.json();
      });
      console.log(gettingData);
      return setGetData(gettingData);
    } catch (error) {
      throw new Error(error);
    }
  };

  const postUserData = async () => {
    try {
      const response = await axios.post("/api/v1/postData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setPostData(response);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          {getData ? (
            <>
              <div>{JSON.stringify(getData)} </div>
            </>
          ) : (
            "Loading..."
          )}
        </div>
        <button onClick={fetchUserData}>GetUsers</button>
      </div>
      <br />
      <div>
        <div>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <button onClick={postUserData}>PostUser</button>
        <div>
          {postData ? (
            <>
              <div>{JSON.stringify(postData.data)} </div>
            </>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}

export default App;
