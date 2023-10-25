import { AnimatedSprite, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { PlayerSection } from '../../types';
import { PLAYER_SIZE } from '../../constants';
import playerSnakeHead1 from '../../assets/snakeHeadGreen-1.png';
import playerSnakeHead2 from '../../assets/snakeHeadGreen-2.png';
import playerSnakeBody1 from '../../assets/snakeBodyGreen-1.png';
import playerSnakeBody2 from '../../assets/snakeBodyGreen-2.png';
import enemySnakeHead1 from '../../assets/snakeHeadOrange-1.png';
import enemySnakeHead2 from '../../assets/snakeHeadOrange-2.png';
import enemySnakeBody1 from '../../assets/snakeBodyOrange-1.png';
import enemySnakeBody2 from '../../assets/snakeBodyOrange-2.png';

const playerSnakeHeadImages = [
  playerSnakeHead1,
  playerSnakeHead2,
];

const playerSnakeBodyImages = [
  playerSnakeBody1,
  playerSnakeBody2,
];

const enemySnakeHeadImages = [
  enemySnakeHead1,
  enemySnakeHead2,
];

const enemySnakeBodyImages = [
  enemySnakeBody1,
  enemySnakeBody2,
];

const rotationMap = {
  'down': 0,
  'left': 90 * PIXI.DEG_TO_RAD,
  'up': 180 * PIXI.DEG_TO_RAD,
  'right': 270 * PIXI.DEG_TO_RAD,
};

type SnakeProps = {
  sections: PlayerSection[];
  isPlayer: boolean;
  scaleX: number;
  scaleY: number;
};

function Snake({ sections, isPlayer, scaleX, scaleY }: SnakeProps) {
  return sections.map((section, index) => {
    if (section.active) {
      let images = isPlayer ? playerSnakeBodyImages : enemySnakeBodyImages;

      if (index === 0) {
        images = isPlayer ? playerSnakeHeadImages : enemySnakeHeadImages;
      }

      return (
        <AnimatedSprite
          key={index}
          anchor={0.5}
          images={images}
          x={section.x * scaleX}
          y={section.y * scaleY}
          rotation={rotationMap[section.direction]}
          width={PLAYER_SIZE * scaleX}
          height={PLAYER_SIZE * scaleY}
          isPlaying={true}
          initialFrame={0}
          animationSpeed={0.05}
        />
      );
    }
  }
  );
}

export default Snake;
