import { FC } from "react";
import { Avatar, TableCell, TableRow } from "@mui/material";

import { T_LeaderboardPayload } from "../../global/types";

type T_ListProps = {
  rows: T_LeaderboardPayload[];
};

export const LeaderboardBody: FC<T_ListProps> = ({ rows }) => {
  if (rows.length === 0) {
    return (
      <TableRow>
        <TableCell align="center" sx={{ color: "white" }} colSpan={3}>
          Тут пока пусто
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {rows
        .sort((a, b) => b.score - a.score)
        .map((row, id) => (
          <TableRow key={row.username}>
            <TableCell align="center" sx={{ color: "white" }}>
              {id + 1}
            </TableCell>
            <TableCell component="th" scope="row" sx={{ display: "flex", columnGap: "10px", alignItems: "center", color: "white" }}>
              <Avatar src={row.avatar || ""}></Avatar>
              {row.username}
            </TableCell>
            <TableCell align="right" sx={{ color: "white" }}>
              {row.score}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};
