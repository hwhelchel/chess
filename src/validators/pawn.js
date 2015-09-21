import '../utilities/piece';
import * as piece from '../validators/piece';

let isDiagonal        = R.cond([
  [isColor('white'), R.allPass([didMove('rank', 1),  didMoveOver(1)])],
  [isColor('black'), R.allPass([didMove('rank', -1), didMoveOver(1)])],
  [R.T, R.F]
]);

let isForwardOne      = R.cond([
  [isColor('white'), R.allPass([didMove('rank', 1),  didMoveOver(0)])],
  [isColor('black'), R.allPass([didMove('rank', -1), didMoveOver(0)])],
  [R.T, R.F]
]);

let isForwardTwo      = R.cond([
  [isColor('white'), R.allPass([didMove('rank', 2),  didMoveOver(0)])],
  [isColor('black'), R.allPass([didMove('rank', -2), didMoveOver(0)])],
  [R.T, R.F]
]);

let isLastRank = R.cond([
  [isColor('white'), isRank(8)],
  [isColor('black'), isRank(1)],
  [R.T, R.F]
]);

let diagonalCapture   = R.allPass([isCapture, isDiagonal]);
let forwardUnoccupied = R.allPass([isForwardOne, isUnoccupied]);
let pawnPromotion     = R.allPass([isLastRank, R.either([diagonalCapture, forwardUnoccupied])]);
let firstMoveTwo      = R.allPass([isForwardTwo, isUnoccupied, isMoved(false)]);
let isValidPawnMove   = R.anyPass([pawnPromotion, firstMoveTwo, forwardUnoccupied, diagonalCapture]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidPawnMove]), R.T],
  [R.T, R.F]
]);
