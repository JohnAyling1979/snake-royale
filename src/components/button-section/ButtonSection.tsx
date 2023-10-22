import { MAX_SPEED } from '../../logic';
import Button from '../button/Button';
import styles from './ButtonSection.module.css';

type ButtonSectionProps = {
  canUpgrade: boolean;
  currentSpeed: number;
};

function ButtonSection({canUpgrade, currentSpeed}: ButtonSectionProps) {
  return (
    <div className={styles.buttonSection}>
      <div className={styles.directions}>
        <Button className={styles.up} text="^" onClick={() => Rune.actions.changeDirection('up')} />
        <Button className={styles.right} text=">" onClick={() => Rune.actions.changeDirection('right')} />
        <Button className={styles.left} text="<" onClick={() => Rune.actions.changeDirection('left')} />
        <Button className={styles.down} text="v" onClick={() => Rune.actions.changeDirection('down')} />
      </div>
      <div className={styles.upgrades}>
        <Button text="Speed" onClick={() => Rune.actions.increaseSpeed()} disabled={!canUpgrade || currentSpeed >= MAX_SPEED}/>
        <Button text="Length" onClick={() => Rune.actions.increaseLength()} disabled={!canUpgrade}/>
      </div>
    </div>
  );
}
export default ButtonSection;
