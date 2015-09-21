import * as piece from '../validators/rook';
import '../utilities/piece';

export const generateMoves(rook, state) => {
  return R.filter(piece.isValidMove({rook, state}), moves);
};
