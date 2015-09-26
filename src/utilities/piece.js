const BOARD_SIZE = R.range(0, 8);

export const samePosition    = move => R.whereEq({ file: move.file, rank: move.rank });

export const inRanks = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));
export const inFiles = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));

let is = R.curry((prop, propValue, {piece, state}, move) => {
  return R.equals(propValue, R.prop(prop, piece));
});

export const didMove = R.curry((direction, distance, {piece, state}, move) => {
  return R.equals(R.add(R.prop(direction, piece), distance), R.prop(direction, move));
});

export const didMoveOver = R.curry(distance, {piece, state}, move) => {
  return R.either([didMove('file', distance), didMove('file', -distance)]);
});

export const sharesSquare = move => R.whereEq({ rank: move.rank, file: move.file });

export const moves = R.lift((rank, file) => ({rank, file}))(R.range(0, 8), R.range(0, 8));

export const isColor = is('color');
