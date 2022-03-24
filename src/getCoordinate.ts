import { Coord, MoveResponse } from "./types";

export function getCoordinate(start: Coord, move: MoveResponse): Coord {
  const { x, y } = start;
  switch(move.move) {
    case 'up':
      return {...start, y: y + 1 };
    case 'down':
      return {...start, y: y - 1 };
    case 'left':
      return {...start, x: x - 1 };
    case 'right':
      return {...start, x: x + 1 };
    default:
      throw new Error('invalid moveResponse');
  }
}
