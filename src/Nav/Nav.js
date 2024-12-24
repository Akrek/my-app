import { NavLink } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <nav>
      <NavLink to="">Главная</NavLink>
      <NavLink to="/auth">Войти</NavLink>
    </nav>
  );
}

export default Nav;
