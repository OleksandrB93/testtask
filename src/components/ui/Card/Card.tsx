import React from "react";
import styles from "./Card.module.scss";
import Avatar from "../Avatar/Avatar";

interface CardProps {
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  type: string;
}

const Card: React.FC<CardProps> = ({
  name,
  position,
  email,
  phone,
  avatar,
  type,
}) => {
  const cardClasses = styles.card;
  return (
    <div className={cardClasses}>
      {type === "normal" && <Avatar avatar={avatar} />}
      <div className={styles.header}>
        <h3>{name}</h3>
      </div>
      {type === "normal" && (
        <>
          <div className={styles.position}>{position}</div>
          <div className={styles.email}>{email}</div>
          <div className={styles.phone}>{phone}</div>
        </>
      )}
    </div>
  );
};

export default Card;
