import styles from "./Avatar.module.scss";

interface AvatarProps {
  avatar?: string;
}

const Avatar = ({ avatar }: AvatarProps) => {
  return <img src={avatar} alt="Avatar" className={styles.avatar} />;
};

export default Avatar;
