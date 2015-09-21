import * as piece from '../validators/piece';
import * as rook  from './rook';
import * as bishop from './bishop';

let isValidQueenMove = R.either(rook.isValidRookMove, bishop.isValidBishopMove);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidQueenMove]), R.T],
  [R.T, R.F]
]);
