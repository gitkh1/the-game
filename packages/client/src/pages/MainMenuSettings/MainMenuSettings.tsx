import classes from './MainMenuSettings.module.scss';
import Button from '@mui/material/Button';
import mainPageBG from '../../assets/images/game-main-menu-bg.jpg';
import { NavLink } from 'react-router-dom';

export default function MainMenuSettings() {
    return(
        <div className={ classes.container }>
            <img src={mainPageBG} alt="game-main-menu-background" className={ classes.background }/>
            <div className={ classes.mainMenuSettings }>
            <h2 className={ classes.settings__header }>Настройки</h2>
                <div className={ classes.settings__item }>
                    <div className={ classes.settings__description }>
                        Режим экрана:
                    </div>
                    <Button color = "primary" variant="contained">Оконный</Button>
                </div>
                <NavLink to='/main-menu'>
                    <Button color = "primary" variant="contained">Вернуться в меню</Button>
                </NavLink>
            </div>
        </div>
    );
}
