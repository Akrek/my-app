import Card from './Card/Card';
import s from './two.module.css';

function Two() {
  return (
    <div className={s.two}>
      <Card text="опа1"/>
      <Card text="опа2"/>
      <Card text="опа3"/>
      <Card text="опа4"/>
    </div>
  );
}

export default Two;
