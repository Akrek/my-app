import s from './Card.module.css';

function Card(p) {
  return (
    <div className={s.card}>
      <p>{p.text}</p>
      <img src="" alt='картинки еще нет'></img>
    </div>
  );
}

export default Card;
