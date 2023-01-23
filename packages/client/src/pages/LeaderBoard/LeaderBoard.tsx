import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


function createData(avatar: string, first_name: string, second_name: string, score: number) {
  return { avatar, name: `${first_name} ${second_name}`, score };
}

// temporary data
const rows = [
  createData('', 'Иван', 'Петров', 92),
  createData('', 'Петр', 'Иванов', 95),
  createData('', 'Александр', 'Фоков', 88),
  createData('', 'Илья', 'Ильин', 94),
];

export const LeaderBoard: FC = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" mb={4}>
          LeaderBoard
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Place</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort((a, b) => b.score - a.score)
                .map((row, id) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell component="th" scope="row" sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                      <Avatar src={row.avatar}></Avatar>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
