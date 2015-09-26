import '../utilities/piece';
import * as generator from '../generators';

export const isUnderAttack = state => {
  let isWhite = R.filter(isColor('white'));
  let mapMoves = R.map(generator.generateMoves(state));
  let containsSquare = R.flip(R.contains);

  return R.pipe(isWhite, mapMoves, R.flatten, R.uniq, containsSquare)(state);
};

export const inCheck = state => {
  return false;
};
