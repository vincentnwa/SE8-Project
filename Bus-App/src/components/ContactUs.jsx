// .\src\components\ContactUs.jsx
import { Link } from "react-router-dom";
import styles from "../components/ContactUs.module.css";
import Card from "./Card";

function ContactUs({ projectManage, scrumManage, developer, designer }) {
  return (
    <Card>
      <div className={styles.contactContainer}>
        <h3>Contact us</h3>
        <p className={styles.jobTitle}>Project & Product Manager:</p>
        <p className={styles.personName}>{projectManage}</p><br />
        <p className={styles.jobTitle}>Scrum Master & Tester:</p>
        <p className={styles.personName}>{scrumManage}</p><br />
        <p className={styles.jobTitle}>Developer:</p>
        <p className={styles.personName}>{developer}</p><br/>
        <p className={styles.jobTitle}>UI / UX Designer:</p>
        <p className={styles.personName}>{designer}</p><br/>

        <Link to="/" className={styles.returnHome}>Back</Link>
      </div>
    </Card>
  );
}

export default ContactUs;
