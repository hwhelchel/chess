import * as validator from '../validators/pawn';
import * as piece from '../utilities/piece';

export const generateMoves(pawn, state) => {
  return R.filter(validator.isValidMove({pawn, state}), piece.moves);
};
