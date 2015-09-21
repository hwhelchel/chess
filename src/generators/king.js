import * as validator from '../validators/king';
import * as piece from '../utilities/piece';

export const generateMoves(king, state) => {
  return R.filter(validator.isValidMove({king, state}), piece.moves);
};
