import classes from './MainMenuSettings.module.scss';
import Button from '@mui/material/Button';
import mainPageBG from '../../assets/images/game-main-menu-bg.jpg';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';



export default function MainMenuSettings() {
    const [windowMode, setWindowMode] = useState('Оконный');
    
    function windowModeToggle(){
        if (!document.fullscreenElement) {
            setWindowMode('Оконный');
        } else {
            setWindowMode('Полноэкранный');
        }
    }

    useEffect(() => {
        windowModeToggle();
    }, []);

    function toggleFullscreen() {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          }
          setWindowMode('Полноэкранный');
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          setWindowMode('Оконный');
        }
    }

    document.addEventListener('fullscreenchange', () => {
        windowModeToggle();
    });

    return(
        <div className={ classes.container }>
            <img src={mainPageBG} alt="game-main-menu-background" className={ classes.background }/>
            <div className={ classes.mainMenuSettings }>
            <h2 className={ classes.settings__header }>Настройки</h2>
                <div className={ classes.settings__item }>
                    <div className={ classes.settings__description }>
                        Режим экрана:
                    </div>
                    <Button color = "primary" variant="contained" onClick={ toggleFullscreen }>{ windowMode }</Button>
                </div>
                <NavLink to='/main-menu'>
                    <Button color = "primary" variant="contained">Вернуться в меню</Button>
                </NavLink>
            </div>
        </div>
    );
}
