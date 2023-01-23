import { FC } from 'react';
import classes from './GameMainMenu.module.scss';
import Button from '@mui/material/Button';
import gameMainMenuBG from '../../assets/images/game-main-menu-bg.jpg';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../routes';

export const GameMainMenu: FC = () => {

    return (
        <div className={classes.container}>
            <img src={gameMainMenuBG} alt="game-main-menu-background" className={classes.background} />
            <div className={classes.gameMainMenu}>
                <NavLink to={PATHS.GAME}>
                    <Button color="primary" variant="contained">Начать игру</Button>
                </NavLink>
                <NavLink to={PATHS.TUTORIAL}>
                    <Button color="primary" variant="contained">Как играть</Button>
                </NavLink>
                <NavLink to={PATHS.SETTINGS}>
                    <Button color="primary" variant="contained">Настройки</Button>
                </NavLink>
                <NavLink to={PATHS.LEADERS}>
                    <Button color="primary" variant="contained">Таблица лидеров</Button>
                </NavLink>
                <NavLink to={PATHS.ABOUT}>
                    <Button color="primary" variant="contained">Об авторах</Button>
                </NavLink>
            </div>
        </div>
    );
};
