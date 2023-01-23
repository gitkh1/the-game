import { FC } from 'react';
import classes from './TutorialPage.module.scss';
import Button from '@mui/material/Button';
import gameMainMenuBG from '../../assets/images/game-main-menu-bg.jpg';
import tutorialImageOne from '../../assets/images/tutorial/tutorial-1.jpg';
import tutorialImageTwo from '../../assets/images/tutorial/tutorial-2.jpg';
import { NavLink } from 'react-router-dom';

export const TutorialPage: FC = () => {
    return(
        <div className={ classes['container']}>
            <img src={gameMainMenuBG} alt="main-page-background" className={ classes['background'] }/>
            <div className={ classes['tutorial'] }>
                <h2 className={ classes['tutorial__header'] }>Как играть</h2>
                <div className={ classes['tutorial__item'] }>
                    <div className={ classes['tutorial__description'] }>
                        Нажимайте ЛЕВУЮ КНОПКУ МЫШИ, чтобы метать снаряды во врагов.
                    </div>
                    <img src={tutorialImageOne} alt="tutorial-1" className={ classes['tutorial__image'] }/>
                </div>
                <div className={ classes['tutorial__item'] }>
                    <div className={ classes['tutorial__description'] }>
                        Нажимайте ПРОБЕЛ, чтобы оживлять врагов в виде скелетов.
                    </div>
                    <img src={tutorialImageTwo} alt="tutorial-2" className={ classes['tutorial__image'] }/>
                </div>

                <NavLink to='/main-menu'>
                    <Button color="primary" variant="contained">Вернуться в меню</Button>
                </NavLink>
            </div>
        </div>
    );
};
