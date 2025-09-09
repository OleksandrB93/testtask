import { memo } from "react";
import Button from "../ui/Button/Button";
import Logo from "./Logo/Logo";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.headerWrapper} role="banner">
      <div className={styles.header}>
        <Logo />
        <nav
          className={styles.btnsWrapper}
          role="navigation"
          aria-label="Main navigation"
        >
          <Button aria-label="View team members">Users</Button>
          <Button aria-label="Sign up for the test assignment">Sign Up</Button>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
