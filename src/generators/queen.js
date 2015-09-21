import * as piece from '../validators/queen';
import '../utilities/piece';

export const generateMoves(queen, state) => {
  return R.filter(piece.isValidMove({queen, state}), moves);
};
