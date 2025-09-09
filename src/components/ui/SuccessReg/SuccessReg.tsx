import styles from "./SuccessReg.module.scss";

interface SuccessRegProps {
  title: string;
  img: string;
}

const SuccessReg = ({ title, img }: SuccessRegProps) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <img src={img} alt="success" className={styles.img} />
    </div>
  );
};

export default SuccessReg;
