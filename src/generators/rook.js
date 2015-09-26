import * as piece from '../validators/rook';
import '../utilities/piece';

export const generateMoves(state, rook) => {
  return R.filter(piece.isValidMove({rook, state}), state);
};
