import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

type T_Props = PropsWithChildren<{
  open: boolean;
}>;

export const SimpleOverlay: FC<T_Props> = ({ open, children }) => {
  if (!open) return null;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      fontSize={48}
      color="white"
      sx={{
        inset: "0",
        background: "hsl(0 0% 0% / 50%)",
      }}
    >
      {children}
    </Box>
  );
};
