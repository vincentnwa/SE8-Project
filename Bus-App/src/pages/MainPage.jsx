// .\src\pages\MainPage.jsx

import styles from "../pages/MainPage.module.css";
import Card from '../components/Card';
import HeaderSection from '../components/HeaderSection';
import Credential from '../components/Credential'; 
import FooterSection from '../components/FooterSection';
import { Link } from 'react-router-dom';

function MainPage() {
    const versionNo = "1.0.0";

    return (
        <Card>
            <HeaderSection appTitle='Bus GoL!ve' />
            <Credential /> 
            <Link to="/contact" className={styles.noUnderline}>Contact us</Link>
            <FooterSection versionNo={`Verison: ${versionNo}`} />
        </Card>
    );
}

export default MainPage;
