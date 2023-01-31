import { FC } from "react";
import { Typography } from "@mui/material";

import { Background } from "../../components/Background";

export const ErrorPage: FC = () => {
  return (
    <Background isWhiteBg={true}>
      <Typography variant="h1" fontWeight="400">
        Ошибка
      </Typography>
      <Typography variant="h5" fontWeight="400">
        Что-то пошло не так
      </Typography>
      <Typography variant="h5" fontWeight="400">
        Попробуйте перезагрузить страницу
      </Typography>
    </Background>
  );
};
