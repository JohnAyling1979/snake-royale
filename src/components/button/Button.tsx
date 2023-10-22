import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

function Button({text, className, onClick, disabled}: ButtonProps) {
  return <button className={`${styles.button} ${className}`} onClick={onClick} disabled={disabled}>{text}</button>;
}

export default Button;
