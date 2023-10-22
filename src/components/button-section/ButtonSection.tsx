import Button from '../button/Button';
import styles from './ButtonSection.module.css';

function ButtonSection() {
  return (
    <div className={styles.buttonSection}>
      <div className={styles.directions}>
        <Button className={styles.up} text="^" onClick={() => console.log('up')} />
        <Button className={styles.right} text=">" onClick={() => console.log('right')} />
        <Button className={styles.left} text="<" onClick={() => console.log('left')} />
        <Button className={styles.down} text="v" onClick={() => console.log('down')} />
      </div>
      <div className={styles.upgrades}>
        <Button text="Speed" onClick={() => console.log('A')} />
        <Button text="Length" onClick={() => console.log('B')} />
      </div>
    </div>
  );
}
export default ButtonSection;
