// .\src\components\Card.jsx

import { useState } from "react";
import styles from "../components/Card.module.css";

function Card({ children }) {
  return <div className={styles.cardContainer}>{children}</div>;
}
export default Card;
