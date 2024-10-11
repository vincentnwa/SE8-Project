import React from "react";
import styles from "./NavBar.module.css";
import { Link, Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to='/map'>
              <h3>Lets Go!</h3>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/contact'>
              <h3>Contact Us</h3>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/aboutus'>
              <h3>About Us</h3>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;