import classes from './GameMainMenu.module.scss';
import Button from '@mui/material/Button';
import gameMainMenuBG from '../../assets/images/game-main-menu-bg.jpg';
import { NavLink } from 'react-router-dom';

export default function GameMainMenu(){

    return(
        <div className={ classes.container }>
            <img src={gameMainMenuBG} alt="game-main-menu-background" className={ classes.background }/>
            <div className={ classes.menu }>
                <NavLink to='/game'>
                    <Button color = "primary" variant="contained">Начать игру</Button>
                </NavLink>
                <NavLink to='/tutorial'>
                    <Button color = "primary" variant="contained">Как играть</Button>
                </NavLink>
                <NavLink to='/settings'>
                    <Button color = "primary" variant="contained">Настройки</Button>
                </NavLink>
                <NavLink to='/profile'>
                    <Button color = "primary" variant="contained">Профиль</Button>
                </NavLink>
                <NavLink to='/leaders'>
                    <Button color = "primary" variant="contained">Таблица лидеров</Button>
                </NavLink>
                <NavLink to='/about'>
                    <Button color = "primary" variant="contained">Об авторах</Button>
                </NavLink>
            </div>
        </div>
    );
};
