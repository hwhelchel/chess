import * as generator from '../generators';

const BOARD_SIZE = R.range(0, 7);

export const inRanks = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));
export const inFiles = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));

export const samePosition = R.curry((action, piece) => action.rank === piece.rank && action.file === piece.file);
export const areOwnPieces = R.curry((action, piece) => action.color === piece.color);
export const isKing       = R.curry((action, piece) => piece.type === 'king');
export const isOwnKing    = R.both(areOwnPieces, isKing);

export const willBeAttackingKing = R.curry((king, piece) => false); // TODO Make Logic.

export const didMove      = R.curry((direction, n) => {
  return R.converge(R.equals, R.pipe(R.path(['action', direction]), R.add(n)),  R.pipe(findPiece, R.prop(direction)));
});

export const hasLocation            = R.curry((piece, action) => piece.rank === action.rank && piece.file === action.file);
export const isDiffColor            = (piece, action) => piece.color !== action.color;

export const hasSameId              = R.pipe(R.prop('id'), R.propEq('id'));

export const findPiece     = ({action, state}) => R.find(hasSameId(action))(state);
export const atDestination = ({action, state}) => R.find(R.flip(hasLocation)(action))(state);
export const otherPieces   = R.pipe(hasSameId, R.reject);
export const isColor       = color => R.pipe(R.path(['action', 'color']), R.equals(color));
export const isRank        = n => R.pipe(R.path(['action', 'rank']),  R.equals(n));
export const didMoveOver   = n => R.either([didMove('file', n), didMove('file', -n)]);
export const isCapture     = ({action, state}) => R.any(piece => R.allPass([hasLocation, isDiffColor])(piece, action))(state);
export const isUnoccupied  = ({action, state}) => R.none(piece => hasLocation(piece, action))(state);
export const reset = ({action, state}) => {
  action.rank        = findPiece({action, state}).rank;
  action.file        = findPiece({action, state}).file;
  return action;
};

export const areAttacking = ({action, state}, squares) => {
  let enemyPieces = R.reject(R.pipe(R.prop('color'), R.equals(action.color)), state);

  return R.filter(piece => generator.isAttacking(piece, state, squares), enemyPieces);
};
