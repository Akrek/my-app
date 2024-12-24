import { NavLink } from "react-router-dom";
import s from "./header.module.css"

function Header() {
  return (
    <header>
      <div className={s.img}>
      </div>
      <div className={s.tel}>
        <p>+7 (888) 888-88-88</p>
      </div>
    </header>
  );
}

export default Header;
