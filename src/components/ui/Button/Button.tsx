import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  variant?: "primary" | "disabled";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  // Build class names using CSS modules
  const buttonClasses = [styles[variant], className].filter(Boolean).join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
