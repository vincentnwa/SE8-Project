import React, { useState } from "react";
import styles from "./Header.module.css";
import SignIn from "./SignIn";

const Header = ({ onLoginStatusChange }) => {
  const [username, setUsername] = useState("");

  const handleSignIn = (username, password) => {
    if (username === "user" && password === "user") {
      onLoginStatusChange(true);
      setUsername(username);
    } else {
      alert("Incorrect credentials!");
    }
  };

  const handleSignOut = () => {
    onLoginStatusChange(false);
    setUsername("");
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>Buss-off</div>
      <div className={styles.auth}>
        {username ? (
          <div>
            <p>Welcome, {username}!</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <SignIn onSignIn={handleSignIn} />
        )}
      </div>
    </div>
  );
};

export default Header;
