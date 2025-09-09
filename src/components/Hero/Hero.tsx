import { memo } from "react";
import Button from "../ui/Button/Button";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">Test assignment for front-end developer</h1>
      <p>
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <Button aria-label="Sign up for the test assignment">Sign Up</Button>
    </section>
  );
};

export default memo(Hero);
