// .\src\components\Credential.jsx

import { useState } from "react";
import styles from "./Credential.module.css";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import MessageModal from "./MessageModal";

function Credential() {
  // Define useState for the credentail and error state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // State for modal message
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Using the Joi the check username and password validation
  const schema = Joi.object({
    username: Joi.string().valid("CohortTeam5").required().messages({
      "any.required": "Username is required.",
      "any.only": "Invalid username or password.",
    }),
    password: Joi.string().valid("GreatTeam5").required().messages({
      "any.required": "Password is required.",
      "any.only": "Invalid username or password",
    }),
  });

  // Define button submit handling state 'arrow function'
  const handleSubmit = (event) => {
    event.preventDefault();

    const { error: validationError } = schema.validate({ username, password });

    if (validationError) {
      setError(validationError.details[0].message);
      setModalMessage(validationError.details[0].message);
      setIsModalOpen(true);
      // console.log(error, validationError)
      return;
    }

    // set login state in localStorage
    localStorage.setItem("isLogin", "true");

    // alert("Login successfully");
    // *** Comment the Add MessageModal ***
    setModalMessage("Login successfully");
    setIsModalOpen(true);
    // Add Page redirect code here later
    // Navigate to the dashboard page if success login
    navigate("/busdashboard");
  };

  // Clear error message when re-enter the username or password
  // const clearErrMsg = () => {
  //   setError("");
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate to the dashboard only after closing the modal for success
    if (modalMessage === "Login successfully") {
      navigate("/busdashboard");
    }
  };

  // Add double-click to clear the input field
  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Welcome to Cohort 8 Project</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputForm}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onDoubleClick={clearInputs}
            // onFocus={clearErrMsg}
            required
          />
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onDoubleClick={clearInputs}
            // onFocus={clearErrMsg}
            required
          />
        </div>
        <button type="submit">Login</button>
        {/* // Longer using it */}
        {/* {error && <p className={styles.error}>{error}</p>} */}
      </form>
      {/* Render the MessageModal when isModalOpen is true */}
      {isModalOpen && (
        <MessageModal message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
}
export default Credential;
