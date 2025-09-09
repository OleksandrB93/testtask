import { memo } from "react";
import styles from "./Avatar.module.scss";
import LazyImage from "../LazyImage/LazyImage";

interface AvatarProps {
  avatar?: string;
}

const Avatar = ({ avatar }: AvatarProps) => {
  return (
    <LazyImage
      src={avatar || ""}
      alt="Avatar"
      className={styles.avatar}
      placeholder="👤"
    />
  );
};

export default memo(Avatar);
