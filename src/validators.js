import * as piece  from './utilities/piece';
import { PAWN_TYPE, KNIGHT_TYPE, BISHOP_TYPE, ROOK_TYPE, KING_TYPE, QUEEN_TYPE } from './types';

import * as knight from './validators/knight';
import * as pawn   from './validators/pawn';
import * as bishop from './validators/bishop';
import * as rook   from './validators/rook';
import * as king   from './validators/king';
import * as queen  from './validators/queen';

export const isValidMove = ({action, state}) => {
  switch(piece.findPiece({action, state}).type) {
    case PAWN_TYPE:
      return pawn.isValidMove({action, state});
    case KNIGHT_TYPE:
      return knight.isValidMove({action, state});
    case BISHOP_TYPE:
      return bishop.isValidMove({action, state});
    case ROOK_TYPE:
      return rook.isValidMove({action, state});
    case KING_TYPE:
      return king.isValidMove({action, state});
    case QUEEN_TYPE:
      return queen.isValidMove({action, state});
    default:
      return false;
  }
};
