import * as piece from '../validators/queen';
import '../utilities/piece';

export const generateMoves(state, queen) => {
  return R.filter(piece.isValidMove({queen, state}), state);
};
