import * as validator from '../validators/rook';
import * as piece from '../utilities/piece';

export const generateMoves(rook, state) => {
  return R.filter(validator.isValidMove({rook, state}), piece.moves);
};
