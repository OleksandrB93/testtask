import React, { memo } from "react";
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
    <article
      className={cardClasses}
      itemScope
      itemType="https://schema.org/Person"
    >
      {type === "normal" && <Avatar avatar={avatar} />}
      <h3 className={styles.header} itemProp="name">
        {name}
      </h3>
      {type === "normal" && (
        <>
          <p className={styles.position} itemProp="jobTitle">
            {position}
          </p>
          <p className={styles.email} itemProp="email">
            {email}
          </p>
          <p className={styles.phone} itemProp="telephone">
            {phone}
          </p>
        </>
      )}
    </article>
  );
};

export default memo(Card);
