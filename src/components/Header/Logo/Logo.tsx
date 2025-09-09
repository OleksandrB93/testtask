import { memo } from "react";
import styles from "./Logo.module.scss";
import logo from "../../../assets/Logo.svg";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default memo(Logo);
