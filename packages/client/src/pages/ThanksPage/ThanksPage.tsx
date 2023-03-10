import { FC } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import bgImage from "../../assets/images/thank-page-bg.jpg";
import { Background } from "../../components/Background";

export const ThanksPage: FC = () => {
  return (
    <Background src={bgImage}>
      <Box color="white" textAlign="center">
        <Typography variant="h1">Спасибо за покупку!</Typography>
        <Typography variant="h5">Вы можете закрыть эту страницу и вернуться в игру.</Typography>
      </Box>
    </Background>
  );
};
