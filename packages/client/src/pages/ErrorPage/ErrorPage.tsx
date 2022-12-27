import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import classes from './ErrorPage.module.scss';

export const ErrorPage: FC = () => {
  return (
    <Box className={classes.root}>
      <Typography variant="h1" className={classes.root__title}>
        Ошибка
      </Typography>
      <Typography className={classes.root__subtitle}>Что-то пошло не так</Typography>
      <Typography className={classes.root__subtitle}>Попробуйте перезагрузить страницу</Typography>
    </Box>
  );
};
