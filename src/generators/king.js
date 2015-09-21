import * as piece from '../validators/king';
import '../utilities/piece';

export const generateMoves(king, state) => {
  return R.filter(piece.isValidMove({king, state}), moves);
};
