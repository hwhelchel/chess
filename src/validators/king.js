import * as piece from './piece';

export const TYPE = 'king';

let isCastling = R.F; // TODO Castling

let changedRank = R.either(piece.didMove('rank', 1), piece.didMove('rank', -1));

let didMoveOne      = R.cond([
  [changedRank, R.either(piece.didMoveOver(1), piece.didMoveOver(0))],
  [R.T, piece.didMoveOver(1)]
]);

let isValidKingMove = R.anyPass([didMoveOne, isCastling]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidKingMove]), R.prop('action')],
  [R.T, piece.reset]
]);
