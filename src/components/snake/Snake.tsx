import { Sprite } from '@pixi/react';
import { PLAYER_SIZE, PlayerSection } from '../../logic';

type SnakeProps = {
  sections: PlayerSection[];
  image: string;
  scaleX: number;
  scaleY: number;
};

function Snake({ sections, image, scaleX, scaleY }: SnakeProps) {
  return sections.map((section, index) => {
    if (section.active) {
      return (
        <Sprite
          key={index}
          image={image}
          x={section.x * scaleX}
          y={section.y * scaleY}
          width={PLAYER_SIZE * scaleX}
          height={PLAYER_SIZE * scaleY}
        />
      );
    }
  }
  );
}

export default Snake;
