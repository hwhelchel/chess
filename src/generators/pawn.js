import * as piece from '../validators/pawn';
import '../utilities/piece';

export const generateMoves(pawn, state) => {
  return R.filter(piece.isValidMove({pawn, state}), moves);
};
