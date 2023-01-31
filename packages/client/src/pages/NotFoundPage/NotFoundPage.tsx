import { FC } from "react";
import { Typography } from "@mui/material";

import { Background } from "../../components/Background";
import { CustomLink } from "../../components/CustomLink";

import classes from "./NotFoundPage.module.scss";

export const NotFoundPage: FC = () => {
  return (
    <Background>
      <Typography variant="h1" className={classes["root__title"]}>
        404
      </Typography>
      <Typography className={classes["root__subtitle"]}>Не туда попали</Typography>
      <CustomLink to="/" title="На главную" />
    </Background>
  );
};
