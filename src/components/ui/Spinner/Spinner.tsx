import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "primary",
  className = "",
}) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${styles[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.spinnerInner}></div>
    </div>
  );
};

export default Spinner;
