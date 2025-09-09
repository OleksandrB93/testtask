import Button from "../ui/Button/Button";
import Card from "../ui/Card/Card";
import styles from "./Team.module.scss";
import team1 from "../../assets/team/1.png";
import team2 from "../../assets/team/2.png";
import team3 from "../../assets/team/3.png";
import team4 from "../../assets/team/4.png";
import team5 from "../../assets/team/5.png";
import team6 from "../../assets/team/6.png";

const team = [
  {
    name: "Salvador Stewart Flynn Thomas Salva",
    position: "Leading specialist of the department o",
    email: "JeromeKlarkaJeromeKlarka19233623",
    phone: "+38 (098) 278 90 24",
    avatar: team1,
  },
  {
    name: "Takamaru Ayako Jurrien",
    position: "Lead Independent Director ",
    email: "Takamuru@gmail.com",
    phone: "+1234567891",
    avatar: team2,
  },
  {
    name: "Ilya",
    position: "Co-Founder and CEO",
    email: "mike.johnson@example.com",
    phone: "+1234567892",
    avatar: team3,
  },
  {
    name: "Alexandre",
    position: "Lead Independent Director",
    email: "Alexandr_develop@gmail.com",
    phone: "+38 (098) 198 44 24",
    avatar: team4,
  },
  {
    name: "Winny",
    position: "Former Senior Director",
    email: "Winny_develop@gmail.com",
    phone: "+38 (098) 278 76 24",
    avatar: team5,
  },
  {
    name: "Simon",
    position: "President of Commerce ",
    email: "Simon@gmail.com",
    phone: "+38 (098) 278 44 00",
    avatar: team6,
  },
];

const Team = () => {
  return (
    <section className={styles.team}>
      <h2>Working with GET request</h2>
      <ul>
        {team.map((member) => (
          <li key={member.name}>
            <Card
              name={member.name}
              position={member.position}
              email={member.email}
              phone={member.phone}
              avatar={member.avatar}
              type="normal"
            />
          </li>
        ))}
      </ul>
      <Button>Show more</Button>
    </section>
  );
};

export default Team;
