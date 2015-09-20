const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let inRanks = R.pipe(R.equals, R.flip(R.find)(RANKS));
let inFiles = R.pipe(R.equals, R.flip(R.find)(FILES));

let samePosition = R.curry((action, piece) => action.rank === piece.rank && action.file === piece.file);
let areOwnPieces = R.curry((action, piece) => action.color === piece.color);
let isKing       = R.curry((action, piece) => piece.type === 'king');
let isOwnKing    = R.both(areOwnPieces, isKing);

let isOnBoard = ({action, state}) => inRanks(action.rank) && inFiles(action.file);
let isNotOccupiedByUser = ({action, state}) => R.none(samePosition(action))(R.filter(areOwnPieces(action), state));

let willBeAttackingKing = R.curry((king, piece) => false); // TODO Make Logic.

let doesNotMakeKingVulnerable = ({action, state}) => {
  let king = R.find(isOwnKing(action), state);
  return R.none(willBeAttackingKing(king))(R.filter(R.complement(areOwnPieces(action)), state));
};

export const isValidMove = R.cond([
  [R.allPass([isOnBoard, isNotOccupiedByUser, doesNotMakeKingVulnerable]), R.T],
  [R.T, R.F]
]);
