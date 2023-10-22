import Button from '../button/Button';
import styles from './ButtonSection.module.css';

type ButtonSectionProps = {
  canUpgrade: boolean;
};

function ButtonSection({canUpgrade}: ButtonSectionProps) {
  return (
    <div className={styles.buttonSection}>
      <div className={styles.directions}>
        <Button className={styles.up} text="^" onClick={() => Rune.actions.changeDirection('up')} />
        <Button className={styles.right} text=">" onClick={() => Rune.actions.changeDirection('right')} />
        <Button className={styles.left} text="<" onClick={() => Rune.actions.changeDirection('left')} />
        <Button className={styles.down} text="v" onClick={() => Rune.actions.changeDirection('down')} />
      </div>
      <div className={styles.upgrades}>
        <Button text="Speed" onClick={() => console.log('A')} disabled={!canUpgrade}/>
        <Button text="Length" onClick={() => console.log('B')} disabled={!canUpgrade}/>
      </div>
    </div>
  );
}
export default ButtonSection;
