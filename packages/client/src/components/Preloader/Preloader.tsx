import { FC, ReactElement } from "react";
import { Box, Fade } from "@mui/material";

import classes from "./Preloader.module.scss";

type T_Props = {
  showLoading: boolean;
  children: ReactElement;
};

export const Preloader: FC<T_Props> = ({ showLoading, children }) => {
  return (
    <Box className={classes.preloader} sx={{ display: "flex" }}>
      <Fade in={!showLoading}>
        <div>{children}</div>
      </Fade>
      <Fade className={classes.preloader__placeholder} in={showLoading}>
        <div>Загрузка...</div>
      </Fade>
    </Box>
  );
};
