import * as piece from '../validators/bishop';
import '../utilities/piece';

export const generateMoves(bishop, state) => {
  return R.filter(piece.isValidMove({bishop, state}), moves);
};
