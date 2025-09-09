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
      <h3 className={styles.header}>{name}</h3>
      {type === "normal" && (
        <>
          <p className={styles.position}>{position}</p>
          <p className={styles.email}>{email}</p>
          <p className={styles.phone}>{phone}</p>
        </>
      )}
    </div>
  );
};

export default Card;
