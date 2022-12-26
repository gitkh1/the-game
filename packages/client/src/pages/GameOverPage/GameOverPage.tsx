import classes from './GameOverPage.module.scss';
import Button from '@mui/material/Button';
import gameOverBG from '../../assets/images/game-over-bg.png';
import { NavLink } from 'react-router-dom';

type T_GameOverPageProps = {
    score?: number,
};

export default function GameOverPage(props: T_GameOverPageProps){

    return(
        <div className={ classes.container }>
            <img src={gameOverBG} alt="game-over-background" className={ classes.background }/>
            <div className={ classes.gameOver }>
                <h2 className={ classes.gameOver__title }>Конец игры</h2>
                <span className={ classes.gameOver__score }>Итоговый счёт: {props.score}</span>
                <div className={ classes.buttons__container }>
                    <NavLink to='/game'>
                        <Button color = "primary" variant="contained">Повторить</Button>
                    </NavLink>
                    <NavLink to='/main-menu'>
                        <Button color = "primary" variant="contained">Вернуться в меню</Button>
                    </NavLink>
                </div>
                
            </div>
        </div>
    );
};
