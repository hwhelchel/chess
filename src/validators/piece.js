const BOARD_SIZE = R.range(0, 7);

export const inRanks = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));
export const inFiles = R.pipe(R.equals, R.flip(R.find)(BOARD_SIZE));

let samePosition = R.curry((action, piece) => action.rank === piece.rank && action.file === piece.file);
let areOwnPieces = R.curry((action, piece) => action.color === piece.color);
let isKing       = R.curry((action, piece) => piece.type === 'king');
let isOwnKing    = R.both(areOwnPieces, isKing);

let isOnBoard = ({action, state}) => inRanks(action.rank) && inFiles(action.file);
let isNotOccupiedByMover = ({action, state}) => R.none(samePosition(action))(R.filter(areOwnPieces(action), state));

let willBeAttackingKing = R.curry((king, piece) => false); // TODO Make Logic.

let doesNotMakeKingVulnerable = ({action, state}) => {
  let king = R.find(isOwnKing(action), state);
  return R.none(willBeAttackingKing(king))(R.filter(R.complement(areOwnPieces(action)), state));
};

export const didMove      = R.curry((direction, n) => {
  return R.converge(R.equals, R.pipe(R.path(['action', direction]), R.add(n)),  R.pipe(findPiece, R.prop(direction)));
});

let isSameLocation          = (piece, action) => piece.rank === action.rank && piece.file === action.file;
let isDiffColor             = (piece, action) => piece.color !== action.color;

let hasSameId             = R.pipe(R.prop('id'), R.propEq('id'));

export const findPiece    = ({action, state}) => R.find(hasSameId(action))(state);
export const isColor      = color => R.pipe(R.path(['action', 'color']), R.equals(color));
export const isRank       = n => R.pipe(R.path(['action', 'rank']),  R.equals(n));
export const didMoveOver  = n => R.either([didMove('file', n), didMove('file', -n)]);
export const isCapture    = ({action, state}) => R.any(piece => R.allPass([isSameLocation, isDiffColor])(piece, action))(state);
export const isUnoccupied = ({action, state}) => R.none(piece => isSameLocation(piece, action))(state);
export const reset = ({action, state}) => {
  action.rank        = findPiece({action, state}).rank;
  action.file        = findPiece({action, state}).file;
  action.invalidated = true;
  return action;
};

export const isValidMove = R.cond([
  [R.allPass([isOnBoard, isNotOccupiedByMover, doesNotMakeKingVulnerable]), R.T],
  [R.T, R.F]
]);
