import { PAWN_TYPE, KNIGHT_TYPE, BISHOP_TYPE, ROOK_TYPE, KING_TYPE, QUEEN_TYPE } from './types';

import * as knight from './generators/knight';
import * as pawn   from './generators/pawn';
import * as bishop from './generators/bishop';
import * as rook   from './generators/rook';
import * as king   from './generators/king';
import * as queen  from './generators/queen';

export const isAttacking = R.F;

export const generateMoves = (piece, state) => {
  switch(piece.type) {
    case PAWN_TYPE:
      return pawn.generateMoves(piece, state);
    case KNIGHT_TYPE:
      return knight.generateMoves(piece, state);
    case BISHOP_TYPE:
      return bishop.generateMoves(piece, state);
    case ROOK_TYPE:
      return rook.generateMoves(piece, state);
    case KING_TYPE:
      return king.generateMoves(piece, state);
    case QUEEN_TYPE:
      return queen.generateMoves(piece, state);
    default:
      return false;
  }
};
