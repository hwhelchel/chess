import { PAWN_TYPE, KNIGHT_TYPE, BISHOP_TYPE, ROOK_TYPE, KING_TYPE, QUEEN_TYPE } from './types';

import * as knight from './generators/knight';
import * as pawn   from './generators/pawn';
import * as bishop from './generators/bishop';
import * as rook   from './generators/rook';
import * as king   from './generators/king';
import * as queen  from './generators/queen';

export const generateMoves = R.curry((state, piece) => {
  switch(piece.type) {
    case PAWN_TYPE:
      return pawn.generateMoves(state, piece);
    case KNIGHT_TYPE:
      return knight.generateMoves(state, piece);
    case BISHOP_TYPE:
      return bishop.generateMoves(state, piece);
    case ROOK_TYPE:
      return rook.generateMoves(state, piece);
    case KING_TYPE:
      return king.generateMoves(state, piece);
    case QUEEN_TYPE:
      return queen.generateMoves(state, piece);
    default:
      return [];
  }
});
