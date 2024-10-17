// .\src\components\HeaderSection.jsx
import styles from "../components/HeaderSection.module.css";

function HeaderSection({ appTitle }) {
  return (
    <>
      <div className={styles.headerContainer}>
        <h1>{appTitle}</h1>
        <p>Powered by SE Cohort 8 (Group 5)</p>
      </div>
    </>
  );
}
export default HeaderSection;
