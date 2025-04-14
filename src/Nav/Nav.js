import { NavLink } from "react-router-dom";
import "./nav.css";

function Nav() {
  return (
    <nav>
      <NavLink to="">Главная</NavLink>
      <NavLink to="/auth">Войти</NavLink>
      <NavLink to="/zav">Заявка 1</NavLink>
      <NavLink to="/zavv">Заявка 2</NavLink>
    </nav>
  );
}

export default Nav;
