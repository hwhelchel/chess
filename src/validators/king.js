import '../utilities/piece';
import * as piece from './piece';
import * as rook from './rook';

let isRookTarget = R.curry(({piece, state}, move) {
  return R.whereEq({type: 'rook', moved: false, color: piece.color })(atDestination(move, state));
});

let notInCheck = R.F; // TODO

let hasUnattackedPassage = R.curry(({piece, state}, move) => {
  let max = R.max(piece.file, move.file);
  let min = R.min(piece.file, move.file);

  let fileRange       = R.range(min, max);
  let attackingPieces = areAttacking({piece, state}, fileRange);

  return R.isEmpty(attackingPieces);
}); // TODO

let isCastling = R.allPass([isTouched(false), isRookTarget, rook.isRankClear, notInCheck, hasUnattackedPassage]);

let changedRank = R.either(didMove('rank', 1), didMove('rank', -1));

let didMoveOne = R.cond([
  [changedRank, R.either(didMoveOver(1), didMoveOver(0))],
  [R.T, didMoveOver(1)]
]);

let isValidKingMove = R.anyPass([didMoveOne, isCastling]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidKingMove]), R.T],
  [R.T, R.F]
]);
