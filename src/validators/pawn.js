import * as piece from './piece.js';

export const TYPE = 'pawn';

let isDiagonal        = R.cond([
  [piece.isColor('white'), R.allPass([piece.didMove('rank', 1),  piece.didMoveOver(1)])],
  [piece.isColor('black'), R.allPass([piece.didMove('rank', -1), piece.didMoveOver(1)])],
  [R.T, R.F]
]);

let isForwardOne      = R.cond([
  [piece.isColor('white'), R.allPass([piece.didMove('rank', 1),  piece.didMove('file', 0)])],
  [piece.isColor('black'), R.allPass([piece.didMove('rank', -1), piece.didMove('file', 0)])],
  [R.T, R.F]
]);

const STARTING_RANKS  = [2, 7];
let isStartingRank    = R.pipe(R.equals, R.flip(R.find)(STARTING_RANKS));
let isFirstMove       = R.pipe(piece.findPiece, R.prop('rank'), isStartingRank);

let isForwardTwo      = R.cond([
  [piece.isColor('white'), R.allPass([piece.didMove('rank', 2),  piece.didMove('file', 0)])],
  [piece.isColor('black'), R.allPass([piece.didMove('rank', -2), piece.didMove('file', 0)])],
  [R.T, R.F]
]);

let isLastRank        = R.cond([
  [piece.isColor('white'), piece.isRank(8)],
  [piece.isColor('black'), piece.isRank(1)],
  [R.T, R.F]
]);

let enPassant         = R.F; // TODO En Passant;
let diagonalCapture   = R.allPass([piece.isCapture, isDiagonal]);
let forwardUnoccupied = R.allPass([isForwardOne, piece.isUnoccupied]);
let pawnPromotion     = R.allPass([isLastRank, R.either([diagonalCapture, forwardUnoccupied])]);
let firstMoveTwo      = R.allPass([isForwardTwo, piece.isUnoccupied, isFirstMove]);
let isValidPawnMove   = R.anyPass([enPassant, pawnPromotion, firstMoveTwo, forwardUnoccupied, diagonalCapture]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidPawnMove]), R.prop('action')],
  [R.T, piece.reset]
]);
