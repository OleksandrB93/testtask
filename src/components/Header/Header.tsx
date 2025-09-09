import Button from "../ui/Button/Button";
import Logo from "./Logo/Logo";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <Logo />
        <div className={styles.btnsWrapper}>
          <Button>Users</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
