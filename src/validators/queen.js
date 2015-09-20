import * as piece from './piece';
import * as rook  from './rook';
import * as bishop from './bishop';

export const TYPE = 'queen';

let isValidQueenMove = R.either(rook.isValidRookMove, bishop.isValidBishopMove);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidQueenMove]), R.prop('action')],
  [R.T, piece.reset]
]);
