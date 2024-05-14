import React, { useEffect,useState } from "react";
import './App.css';
import LoginPage from "./components/login";
import HomePage from "./components/home";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      {token == null ? <LoginPage /> : <HomePage />}
    </>
  );
  
}

export default App;
