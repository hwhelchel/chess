import { PAWN_TYPE, KNIGHT_TYPE, BISHOP_TYPE, ROOK_TYPE, KING_TYPE, QUEEN_TYPE } from './types';

import * as knight from './generators/knight';
import * as pawn   from './generators/pawn';
import * as bishop from './generators/bishop';
import * as rook   from './generators/rook';
import * as king   from './generators/king';
import * as queen  from './generators/queen';

export const isAttacking = R.F;
// export const isAttacking = (piece, state, squares) => {
//   switch(piece.type) {
//     case PAWN_TYPE:
//       return pawn.isAttacking(piece, state, squares);
//     case KNIGHT_TYPE:
//       return knight.isAttacking(piece, state, squares);
//     case BISHOP_TYPE:
//       return bishop.isAttacking(piece, state, squares);
//     case ROOK_TYPE:
//       return rook.isAttacking(piece, state, squares);
//     case KING_TYPE:
//       return king.isAttacking(piece, state, squares);
//     case QUEEN_TYPE:
//       return queen.isAttacking(piece, state, squares);
//     default:
//       return false;
//   }
// };
