import { FC } from "react";
import { Typography } from "@mui/material";

import { Background } from "../../components/Background";

import classes from "./ErrorPage.module.scss";


export const ErrorPage: FC = () => {
  return (
    <Background>
      <Typography variant="h1" className={classes["root__title"]}>
        Ошибка
      </Typography>
      <Typography className={classes["root__subtitle"]}>Что-то пошло не так</Typography>
      <Typography className={classes["root__subtitle"]}>Попробуйте перезагрузить страницу</Typography>
    </Background>
  );
};
