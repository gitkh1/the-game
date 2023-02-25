import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Button, MobileStepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Background } from "../../components/Background";
import { useLeaderboardHasNext, useLeaderboardResults } from "../../global/hooks/leaderboardHooks";

import { LeaderboardBody } from "./LeaderboardBody";

import classes from "./LeaderBoard.module.scss";

export const LeaderBoard: FC = () => {
  const [page, setPage] = useState(0);
  const rows = useLeaderboardResults(page);
  const hasNext = useLeaderboardHasNext();

  const handleBack = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

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
                <LeaderboardBody rows={rows} />
              </TableBody>
            </Table>
          </TableContainer>
          {
            <MobileStepper
              sx={{
                color: "white",
                marginTop: "25px",
                padding: "12px",
                width: "100%",
                borderRadius: "10px",
                background: "rgba(0,0,0,.5)",
              }}
              variant="text"
              steps={page + (hasNext ? 2 : 1)}
              position="static"
              activeStep={page}
              nextButton={
                <Button
                  size="small"
                  sx={{
                    color: "white",
                    ":disabled": {
                      color: "rgb(137 137 137)",
                    },
                  }}
                  onClick={handleNext}
                  disabled={!hasNext}
                >
                  ВПЕРЕД
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  sx={{
                    color: "white",
                    ":disabled": {
                      color: "rgb(137 137 137)",
                    },
                  }}
                  onClick={handleBack}
                  disabled={page === 0}
                >
                  <KeyboardArrowLeft />
                  НАЗАД
                </Button>
              }
            />
          }
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
