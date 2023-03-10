import { FC, useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { T_Ability } from "../engine";

type T_Props = {
  shown: boolean;
  abilites: T_Ability[];
  inset: string;
  applyAbility: (ability: T_Ability) => void;
};

export const AbilitiesList: FC<T_Props> = ({ abilites, inset, shown, applyAbility }) => {
  const SIZE = 48;
  const [existingAbilities, setExistingAbilities] = useState<T_Ability[]>([]);

  useEffect(() => {
    const shownAbilities = abilites.filter((ability) => ability.count > 0);
    setExistingAbilities(shownAbilities);
  }, [abilites]);

  return (
    <Stack
      alignItems="center"
      sx={{
        opacity: shown ? 100 : 0,
        pointerEvents: shown ? "auto" : "none",
        transition: "ease-in opacity 0.25s",
        position: "absolute",
        inset: inset,
      }}
    >
      {existingAbilities.map((ability) => (
        <IconButton key={ability.name} onClick={() => applyAbility(ability)} sx={{ position: "relative" }} title={ability.name}>
          <img
            src={ability.icon}
            alt={ability.name}
            style={{
              width: SIZE,
              height: SIZE,
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              top: 50,
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            {ability.count}
          </Typography>
        </IconButton>
      ))}
    </Stack>
  );
};
