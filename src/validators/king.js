import '../utilities/piece';
import * as cartographer from '../cartographers';
import * as piece from './piece';
import * as rook from './rook';

let atDestination = (move, state) => R.find(sharesSquare(move))(state);

let isRookTarget = R.curry(({piece, state}, move) {
  return R.whereEq({type: 'rook', moved: false, color: piece.color })(atDestination(move, state));
});

let notInCheck = R.complement(cartographer.inCheck);

let inFileRange     = R.range;

let attackedSquares = R.filter(cartographer.isUnderAttack(color, state))

let hasUnattackedPassage = R.curry(({piece, state}, move) => {
  let max = R.max(piece.file, move.file);
  let min = R.min(piece.file, move.file);

  return R.isEmpty(attackedSquares(piece.color, state, inFileRange(min, max)));
});

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
