import styles from "./Logo.module.scss";
import logo from "../../../assets/logo.svg";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
