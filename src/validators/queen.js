import * as piece from '../utilities/piece';
import * as pieceValidator from '../validators/piece';
import * as rook  from './rook';
import * as bishop from './bishop';

let isValidQueenMove = R.either(rook.isValidRookMove, bishop.isValidBishopMove);

export const isValidMove = R.cond([
  [R.allPass([pieceValidator.isValidMove, isValidQueenMove]), R.prop('action')],
  [R.T, piece.reset]
]);
