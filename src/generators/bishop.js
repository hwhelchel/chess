import * as validator from '../validators/bishop';
import * as piece from '../utilities/piece';

export const generateMoves(bishop, state) => {
  return R.filter(validator.isValidMove({bishop, state}), piece.moves);
};
