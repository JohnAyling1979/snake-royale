import Button from '../button/Button';
import styles from './ButtonSection.module.css';

type ButtonSectionProps = {
  canUpgrade: boolean;
};

function ButtonSection({canUpgrade}: ButtonSectionProps) {
  return (
    <div className={styles.buttonSection}>
      <div className={styles.directions}>
        <Button className={styles.up} text="^" onClick={() => console.log('up')} />
        <Button className={styles.right} text=">" onClick={() => console.log('right')} />
        <Button className={styles.left} text="<" onClick={() => console.log('left')} />
        <Button className={styles.down} text="v" onClick={() => console.log('down')} />
      </div>
      <div className={styles.upgrades}>
        <Button text="Speed" onClick={() => console.log('A')} disabled={!canUpgrade}/>
        <Button text="Length" onClick={() => console.log('B')} disabled={!canUpgrade}/>
      </div>
    </div>
  );
}
export default ButtonSection;
