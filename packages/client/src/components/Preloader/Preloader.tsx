import { Box, Fade } from '@mui/material';
import { FC, ReactElement } from 'react';
import classes from './Preloader.module.scss';

type Props = {
  loaded: boolean;
  children: ReactElement;
};

export const Preloader: FC<Props> = ({ loaded, children }) => {
  return (
    <Box className={classes.preloader} sx={{ display: 'flex' }}>
      <Fade in={loaded}>
        <div>{children}</div>
      </Fade>
      <Fade className={classes.preloader__placeholder} in={!loaded}>
        <div>Loading...</div>
      </Fade>
    </Box>
  );
};
