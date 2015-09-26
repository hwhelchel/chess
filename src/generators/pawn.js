import * as piece from '../validators/pawn';
import '../utilities/piece';

export const generateMoves(state, pawn) => {
  return R.filter(piece.isValidMove({pawn, state}), state);
};
