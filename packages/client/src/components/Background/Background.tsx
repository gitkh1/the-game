import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/system";

import darkBg from "../../assets/images/dark theme/game-main-menu-bg.jpg";
import lightBg from "../../assets/images/light theme/game-main-menu-bg.jpg";

import global from "../../global/styles/Global.module.scss";

type T_BackgroundProps = PropsWithChildren<{ src?: string; isWhiteBg?: boolean; whiteBg?: string }>;

export const Background: FC<T_BackgroundProps> = ({ children, src = darkBg, isWhiteBg = false, whiteBg = lightBg }) => {
  isWhiteBg = localStorage.getItem("theme") === "light";
  return (
    <Box className={global["container"]}>
      {!isWhiteBg ? (
        <img src={src} alt={"background"} className={global["background"]} />
      ) : (
        <img src={whiteBg} alt={"background"} className={global["background"]} />
      )}
      {children}
    </Box>
  );
};
