import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/system";

import darkBg from "../../assets/images/dark-theme/game-main-menu-bg.jpg";
import lightBg from "../../assets/images/light-theme/game-main-menu-bg.jpg";

import global from "../../global/styles/Global.module.scss";

type T_BackgroundProps = PropsWithChildren<{ src?: string; whiteBg?: string }>;

export const Background: FC<T_BackgroundProps> = ({ children, src = darkBg, whiteBg = lightBg }) => {
  const isWhiteBg = localStorage.getItem("theme") === "light";
  const imgSrc = isWhiteBg ? whiteBg : src;
  return (
    <Box className={global["container"]}>
      <img src={imgSrc} alt={"background"} className={global["background"]} />
      {children}
    </Box>
  );
};
