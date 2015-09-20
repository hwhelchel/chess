const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let inRanks = R.pipe(R.equals, R.flip(R.find)(RANKS));
let inFiles = R.pipe(R.equals, R.flip(R.find)(FILES));

let samePosition = R.curry((action, piece) => action.toRank === piece.rank && action.toFile === piece.file);
let areOwnPieces = R.curry((movedPiece, piece) => movedPiece.color === piece.color);
let isKing       = R.curry((movedPiece, piece) => piece.type === 'king');
let isOwnKing    = R.both(areOwnPieces, isKing);

let isOnBoard = ({piece, action, state}) => inRanks(action.toRank) && inFiles(action.toFile);
let isNotOccupiedByUser = ({piece, action, state}) => R.none(samePosition(action))(R.filter(areOwnPieces(piece), state));

let willBeAttackingKing = R.curry((king, piece) => false); // TODO Make Logic.

let doesNotMakeKingVulnerable = ({piece, action, state}) => {
  let king = R.find(isOwnKing(piece), state);
  return R.none(willBeAttackingKing(king))(R.filter(R.complement(areOwnPieces(piece)), state));
};

export const isValidMove = R.cond([
  [R.allPass([isOnBoard, isNotOccupiedByUser, doesNotMakeKingVulnerable]), ({piece, action, state}) => ({action, state})]
]);
