import * as piece from '../validators/bishop';
import '../utilities/piece';

export const generateMoves(state, bishop) => {
  return R.filter(piece.isValidMove({bishop, state}), state);
};
