import { Sprite } from '@pixi/react';
import apple from '../../assets/apple.png';
import { FOOD_SIZE } from '../../logic';

type AppleProps = {
  food: { x: number; y: number };
  scaleX: number;
  scaleY: number;
};

function Apple({ food, scaleX, scaleY}: AppleProps) {
  return (
    <Sprite
      image={apple}
      x={food.x * scaleX}
      y={food.y * scaleY}
      width={FOOD_SIZE * scaleX}
      height={FOOD_SIZE * scaleY}
    />
  );
}

export default Apple;
