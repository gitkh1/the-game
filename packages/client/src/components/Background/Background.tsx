import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/system";

import bg from "../../assets/images/game-main-menu-bg.jpg";

import global from "../../global/styles/Global.module.scss";

type T_BackgroundProps = PropsWithChildren<{ src?: string; isWhiteBg?: boolean }>;

export const Background: FC<T_BackgroundProps> = ({ children, src = bg, isWhiteBg = false }) => {
  return (
    <Box className={global["container"]}>
      {!isWhiteBg ? <img src={src} alt={"background"} className={global["background"]} /> : null}
      {children}
    </Box>
  );
};
