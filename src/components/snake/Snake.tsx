import { AnimatedSprite } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { Player } from '../../types';
import { PLAYER_SIZE } from '../../constants';
import playerSnakeHead1 from '../../assets/snakeHeadGreen-1.png';
import playerSnakeHead2 from '../../assets/snakeHeadGreen-2.png';
import playerSnakeHeadDead from '../../assets/snakeHeadGreen-dead.png';
import playerSnakeBody1 from '../../assets/snakeBodyGreen-1.png';
import playerSnakeBody2 from '../../assets/snakeBodyGreen-2.png';
import enemySnakeHead1 from '../../assets/snakeHeadOrange-1.png';
import enemySnakeHead2 from '../../assets/snakeHeadOrange-2.png';
import enemySnakeHeadDead from '../../assets/snakeHeadOrange-dead.png';
import enemySnakeBody1 from '../../assets/snakeBodyOrange-1.png';
import enemySnakeBody2 from '../../assets/snakeBodyOrange-2.png';
import eatPath from '../../assets/eat.mp3';
import diePath from '../../assets/die.mp3';
import { InterpolatorLatency } from 'rune-games-sdk';

const playerSnakeHeadImages = [
  playerSnakeHead1,
  playerSnakeHead2,
];

const playerSnakeHeadDeadImage = [
  playerSnakeHeadDead,
];

const playerSnakeBodyImages = [
  playerSnakeBody1,
  playerSnakeBody2,
];

const enemySnakeHeadImages = [
  enemySnakeHead1,
  enemySnakeHead2,
];

const enemySnakeHeadDeadImage = [
  enemySnakeHeadDead,
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

const eat = new Audio(eatPath);
const die = new Audio(diePath);

type SnakeProps = {
  player: Player;
  isPlayer: boolean;
  scaleX: number;
  scaleY: number;
  interpolator: InterpolatorLatency<number | number[]> | undefined;
};

function Snake({ player, isPlayer, scaleX, scaleY, interpolator }: SnakeProps) {
  if (isPlayer && player.playSound) {
    if (player.playSound === 'eat') {
      eat.play();
    } else if (player.playSound === 'die') {
      die.play();
    }
  }


  return player.sections.map((section, index) => {
    if (section.active) {
      let images = isPlayer ? playerSnakeBodyImages : enemySnakeBodyImages;
      let position = [section.x, section.y];

      if (index === 0) {
        if (player.dead) {
          images = isPlayer ? playerSnakeHeadDeadImage : enemySnakeHeadDeadImage;
        } else {
          images = isPlayer ? playerSnakeHeadImages : enemySnakeHeadImages;
        }

        if (interpolator) {
          position = interpolator.getPosition() as number[];
        }
      }

      return (
        <AnimatedSprite
          key={index}
          anchor={0.5}
          images={images}
          x={position[0] * scaleX}
          y={position[1] * scaleY}
          rotation={rotationMap[section.direction]}
          width={PLAYER_SIZE * scaleX}
          height={PLAYER_SIZE * scaleY}
          isPlaying={!player.dead}
          initialFrame={0}
          animationSpeed={0.05}
        />
      );
    }
  }
  );
}

export default Snake;
