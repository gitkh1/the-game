/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Background } from "../../components/Background";

import classes from "./LeaderBoard.module.scss";

function createData(avatar: string, first_name: string, second_name: string, score: number) {
  return { avatar, name: `${first_name} ${second_name}`, score };
}

// temporary data
const rows = [
  createData("", "Иван", "Петров", 92),
  createData("", "Петр", "Иванов", 95),
  createData("", "Александр", "Фоков", 88),
  createData("", "Илья", "Ильин", 94),
];

export const LeaderBoard: FC = () => {
  return (
    <Background>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography component="h1" variant="h3" mb={4} sx={{ color: "white" }}>
            Таблица лидеров
          </Typography>
          <TableContainer>
            <Table
              sx={{
                minWidth: 300,
                padding: "25px",
                borderRadius: "10px",
                background: "rgba(0,0,0,.5)",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Place
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    Name
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .sort((a, b) => b.score - a.score)
                  .map((row, id) => (
                    <TableRow key={row.name}>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {id + 1}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ display: "flex", columnGap: "10px", alignItems: "center", color: "white" }}>
                        <Avatar src={row.avatar}></Avatar>
                        {row.name}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "white" }}>
                        {row.score}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <NavLink to="/main-menu" className={classes["back__button"]}>
            <Button color="primary" variant="contained">
              Вернуться в меню
            </Button>
          </NavLink>
        </Box>
      </Container>
    </Background>
  );
};
