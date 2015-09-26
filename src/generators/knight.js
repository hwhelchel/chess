import * as piece from '../validators/knight';
import '../utilities/piece';

export const generateMoves(state, knight) => {
  return R.filter(piece.isValidMove({knight, state)}, state);
};
