import { FC } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import { Background } from "../../components/Background";

import classes from "./AboutPage.module.scss";

const developers = [
  { id: 1, name: "Anatoly2403", link: "https://github.com/Anatoly2403" },
  { id: 2, name: "ftoh", link: "https://github.com/ftoh" },
  { id: 3, name: "gitkh1", link: "https://github.com/gitkh1" },
  { id: 4, name: "Raketich", link: "https://github.com/Raketich" },
  { id: 5, name: "ZRNRD", link: "https://github.com/ZRNRD" },
];

export const AboutPage: FC = () => {
  return (
    <Background>
      <div className={classes["about-page"]}>
        <h2 className={classes["about-page__header"]}>Об авторах</h2>

        {developers.map(({ id, name, link }) => (
          <div className={classes["about-page__item"]} key={id}>
            <div className={classes["about-page__description"]}>{name}</div>
            <Button href={link} target="_blank" rel="noopener" color="success" variant="contained">
              GitHub
            </Button>
          </div>
        ))}

        <NavLink to="/main-menu">
          <Button color="primary" variant="contained">
            Вернуться в меню
          </Button>
        </NavLink>
      </div>
    </Background>
  );
};
