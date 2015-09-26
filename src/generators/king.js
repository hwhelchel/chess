import * as piece from '../validators/king';
import '../utilities/piece';

export const generateMoves(state, king) => {
  return R.filter(piece.isValidMove({king, state}), state);
};
