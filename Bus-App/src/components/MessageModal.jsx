// .\src\components\MesageModal.jsx

import React from "react";
import styles from "./MessageModal.module.css"; // Create this CSS file for styling

const MessageModal = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;
