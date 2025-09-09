import { memo, useCallback } from "react";
import Button from "../ui/Button/Button";
import Logo from "./Logo/Logo";
import styles from "./Header.module.scss";

const Header = () => {
  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleUsersClick = useCallback(() => {
    const teamElement = document.getElementById("team");
    if (teamElement) {
      teamElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSignUpClick = useCallback(() => {
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header className={styles.headerWrapper} role="banner">
      <div className={styles.header}>
        <div onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <Logo />
        </div>
        <nav
          className={styles.btnsWrapper}
          role="navigation"
          aria-label="Main navigation"
        >
          <Button onClick={handleUsersClick} aria-label="View team members">
            Users
          </Button>
          <Button
            onClick={handleSignUpClick}
            aria-label="Sign up for the test assignment"
          >
            Sign Up
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
