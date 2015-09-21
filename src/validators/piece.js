import '../utilities/piece';

let willBeAttacking = R.curry((piece, move, possibleAttacker) => false); // TODO
let isSameColor     = R.curry((piece, otherPiece) => piece.color === otherPiece.color));
let isKing          = R.curry((piece, otherPiece) => otherPiece.type  === 'king'));
let isOwnKing       = R.both(isSameColor, isKing);
let king            = (piece, state) => R.find(isOwnKing(piece), state);

let doesNotMakeKingVulnerable = R.curry(({piece, state}, move) => {
  return R.none(willBeAttacking(king(piece, state), move))(R.reject(isSameColor(piece), state));
});

let isNotOccupiedByMover = R.curry(({piece, state}, move) => {
  return R.none(samePosition(move))(R.filter(isSameColor(piece), state));
});

let isOnBoard = R.curry(({piece, state}, move) => {
  return R.both(inRanks(move.rank), inFiles(move.file));
};

export const isValidMove = R.cond([
  [R.allPass([isOnBoard, isNotOccupiedByMover, doesNotMakeKingVulnerable]), R.T],
  [R.T, R.F]
]);
