import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [isMsg, setMsg] = useState("");
  const [isError, setIsError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username !== "user" || data.password !== "password") {
      setIsError("Invalid username or password");
    } else {
      setMsg("Welcome, user!");
    }
  };

  return (
    <div className='container'>
      <h4>Login Page</h4>
      {isMsg ? (
        <p>{isMsg}</p>
      ) : (
        <>
          {isError && <p>{isError}</p>}
          <form onSubmit={handleSubmit}>
            <div className='wrapper'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                id='username'
                required
                name='username'
                value={data.username}
                onChange={(e) => handleChange(e)}
                autoComplete='off'
                placeholder='Username'
              />
            </div>
            <div className='wrapper'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                required
                name='password'
                value={data.password}
                onChange={(e) => handleChange(e)}
                autoComplete='off'
                placeholder='Password'
              />
            </div>
            <button>Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
