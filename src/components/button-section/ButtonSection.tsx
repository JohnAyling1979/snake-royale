import { MAX_SPEED } from '../../constants';
import Button from '../button/Button';
import upgradePath from '../../assets/upgrade.wav';
import styles from './ButtonSection.module.css';

type ButtonSectionProps = {
  canUpgrade: boolean;
  currentSpeed: number;
};

const upgrade = new Audio(upgradePath);

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
        <Button
          text="Speed"
          onClick={
            () => {
              upgrade.play();
              Rune.actions.increaseSpeed();
            }
          }
          disabled={!canUpgrade || currentSpeed >= MAX_SPEED}
        />
        <Button
          text="Length"
          onClick={
            () => {
              upgrade.play();
              Rune.actions.increaseLength();
            }
          }
          disabled={!canUpgrade}
        />
      </div>
    </div>
  );
}
export default ButtonSection;
