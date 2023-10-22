import { Sprite } from '@pixi/react';
import apple from '../../assets/apple.png';

type AppleProps = {
  x: number;
  y: number;
};

function Apple({ x, y}: AppleProps) {
  return (
    <Sprite
      image={apple}
      x={x}
      y={y}
      width={20}
      height={20}
    />
  );
}

export default Apple;
