import styles from "./SuccessReg.module.scss";
import Button from "../Button/Button";
import successImage from "../../../assets/success-image.svg";

interface SuccessRegProps {
  title?: string;
  img?: string;
  onBackToForm?: () => void;
}

const SuccessReg = ({
  title = "User successfully registered",
  img = successImage,
  onBackToForm,
}: SuccessRegProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <img src={img} alt="success" className={styles.img} />
      {onBackToForm && (
        <Button onClick={onBackToForm} variant="primary">
          Back to form
        </Button>
      )}
    </div>
  );
};

export default SuccessReg;
