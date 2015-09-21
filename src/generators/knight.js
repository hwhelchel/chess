import * as piece from '../validators/knight';
import '../utilities/piece';

export const generateMoves(knight, state) => {
  return R.filter(piece.isValidMove({knight, state)}, moves);
};
