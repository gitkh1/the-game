import { FC } from 'react';
import classes from './GameOverPage.module.scss';
import Button from '@mui/material/Button';
import gameOverBG from '../../assets/images/game-over-bg.jpg';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../routes';

type T_GameOverPageProps = {
    score?: number,
};

export const GameOverPage: FC = (props: T_GameOverPageProps) => {

    return(
        <div className={ classes['container'] }>
            <img src={gameOverBG} alt="game-over-background" className={ classes['background'] }/>
            <div className={ classes['game-over'] }>
                <h2 className={ classes['game-over__title'] }>Конец игры</h2>
                <span className={ classes['game-over__score'] }>Итоговый счёт: {props.score}</span>
                <div className={ classes['buttons__container'] }>
                    <NavLink to={PATHS.GAME}>
                        <Button color="primary" variant="contained">Повторить</Button>
                    </NavLink>
                    <NavLink to={PATHS.MAIN_MENU}>
                        <Button color="primary" variant="contained">Вернуться в меню</Button>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};
