import classes from './MainPage.module.scss';
import Button from '@mui/material/Button';
import mainPageBG from '../../assets/images/main-page-bg.jpg';
import { NavLink } from 'react-router-dom';

export default function MainPage(){

    return (
        <div className={ classes.container }>
          <img src={mainPageBG} alt="main-page-background" className={ classes.background }/>
          <div className={ classes.mainPage }>
            <h1>Norman the Necromancer</h1>
            <span className={ classes.description }>Это экшен-РПГ игра, в которой вам предстоит взять на себя роль могущественного некроманта и защитить свои владения от волн недружелюбных к вам местных жителей.</span>
            <div className={ classes.buttons__container }>
              <NavLink to='/login'>
                <Button color = "primary" variant="contained">Логин</Button>
              </NavLink>
              <NavLink to='/signup'>
                <Button variant="contained">Регистрация</Button>
              </NavLink>
            </div>
          </div>
        </div> 
      );
};

