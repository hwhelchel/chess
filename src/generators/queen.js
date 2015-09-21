import * as validator from '../validators/queen';
import * as piece from '../utilities/piece';

export const generateMoves(queen, state) => {
  return R.filter(validator.isValidMove({queen, state}), piece.moves);
};
