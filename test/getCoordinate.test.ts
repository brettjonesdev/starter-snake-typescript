import { getCoordinate } from '../src/getCoordinate'

describe('getCoordinate tests', () => {
  it('should move left', () => {
    expect(getCoordinate({ x: 3, y: 3 }, { move: 'left' })).toEqual({ x: 2, y: 3});
  });

  it('should move right', () => {
    expect(getCoordinate({ x: 3, y: 3 }, { move: 'right' })).toEqual({ x: 4, y: 3});
  });

  it('should move up', () => {
    expect(getCoordinate({ x: 3, y: 3 }, { move: 'up' })).toEqual({ x: 3, y: 4});
  });

  it('should move down', () => {
    expect(getCoordinate({ x: 3, y: 3 }, { move: 'down' })).toEqual({ x: 3, y: 2});
  });
});
