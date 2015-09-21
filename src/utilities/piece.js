import * as generator from '../generators';
const BOARD_SIZE = R.range(0, 8);

export const isSameColor     = R.curry((piece, otherPiece) => piece.color === otherPiece.color));
export const willBeAttacking = R.curry((piece, move, possibleAttacker) => false);
export const samePosition    = move => R.whereEq({ file: move.file, rank: move.rank });

export const inRanks = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));
export const inFiles = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));

export const is = R.curry((prop, propValue, {piece, state}, move) => {
  return R.equals(propValue, R.prop(prop, piece));
});

export const isRank    = is('rank');
export const isColor   = is('color');
export const isMoved   = is('moved');

export const didMove = R.curry((direction, distance, {piece, state}, move) => {
  return R.equals(R.add(R.prop(direction, piece), distance), R.prop(direction, move));
});

export const didMoveOver = R.curry(distance, {piece, state}, move) => {
  return R.either([didMove('file', distance), didMove('file', -distance)]);
});

export const hasLocation   = move => R.whereEq({ rank: move.rank, file: move.file });
export const atDestination = (move, state) => R.find(R.flip(hasLocation)(move))(state);

export const isDiffColor            = (piece, action) => piece.color !== action.color;
export const hasSameId              = R.pipe(R.prop('id'), R.propEq('id'));
export const findPiece     = ({action, state}) => R.find(hasSameId(action))(state);
export const otherPieces   = R.pipe(hasSameId, R.reject);
export const isCapture     = ({action, state}) => R.any(piece => R.allPass([hasLocation, isDiffColor])(piece, action))(state);
export const isUnoccupied  = ({action, state}) => R.none(piece => hasLocation(piece, action))(state);
export const reset = ({action, state}) => {
  action.rank        = findPiece({action, state}).rank;
  action.file        = findPiece({action, state}).file;
  return action;
};

export const moves = R.lift((rank, file) => ({rank, file}))(R.range(0, 8), R.range(0, 8));

export const areAttacking = ({action, state}, squares) => {
  let enemyPieces = R.reject(R.pipe(R.prop('color'), R.equals(action.color)), state);

  return R.filter(piece => generator.isAttacking(piece, state, squares), enemyPieces);
};
