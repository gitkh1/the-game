import { FC } from 'react';
import { CustomLink } from '../../components/CustomLink';
import { Box, Typography } from '@mui/material';
import classes from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
  return (
    <Box className={classes.root}>
      <Typography variant="h1" className={classes.root__title}>
        404
      </Typography>
      <Typography className={classes.root__subtitle}>Не туда попали</Typography>
      <CustomLink to="/" title="На главную" />
    </Box>
  );
};
