import styles from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
const MainNavigation = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Great Quodes</div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink
                            className={(navData) =>
                                navData.isActive ? styles.active : ""
                            }
                            to="/quotes"
                        >
                            All Quotes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={(navData) =>
                                navData.isActive ? styles.active : ""
                            }
                            to="/new-quote"
                        >
                            Add a Quotes
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
