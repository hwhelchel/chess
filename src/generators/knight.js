import * as validator from '../validators/knight';
import * as piece from '../utilities/piece';

export const generateMoves(knight, state) => {
  return R.filter(validator.isValidMove({knight, state)}, piece.moves);
};
