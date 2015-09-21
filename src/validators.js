import './utilities/piece';
import { PAWN_TYPE, KNIGHT_TYPE, BISHOP_TYPE, ROOK_TYPE, KING_TYPE, QUEEN_TYPE } from './types';

import * as knight from './validators/knight';
import * as pawn   from './validators/pawn';
import * as bishop from './validators/bishop';
import * as rook   from './validators/rook';
import * as king   from './validators/king';
import * as queen  from './validators/queen';

export const isValidMove = ({piece, state}, move) => {
  switch(piece.type) {
    case PAWN_TYPE:
      return pawn.isValidMove({piece, state}, move);
    case KNIGHT_TYPE:
      return knight.isValidMove({piece, state}, move);
    case BISHOP_TYPE:
      return bishop.isValidMove({piece, state}, move);
    case ROOK_TYPE:
      return rook.isValidMove({piece, state}, move);
    case KING_TYPE:
      return king.isValidMove({piece, state}, move);
    case QUEEN_TYPE:
      return queen.isValidMove({piece, state}, move);
    default:
      return false;
  }
};
