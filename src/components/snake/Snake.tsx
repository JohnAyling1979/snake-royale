import { Sprite } from '@pixi/react';

type SnakeProps = {
  x: number;
  y: number;
  image: string;
};

function Snake({ x, y, image }: SnakeProps) {
  return (
    <Sprite
      image={image}
      x={x}
      y={y}
      width={20}
      height={20}
    />
  );
}

export default Snake;
