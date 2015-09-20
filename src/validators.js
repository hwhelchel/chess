import * as knight from './validators/knight';
import * as pawn   from './validators/pawn';
import * as bishop from './validators/bishop';
import * as rook   from './validators/rook';
import * as king   from './validators/king';
import * as queen  from './validators/queen';

// export const isValidMove = R.cond([[R.T, action => action]]);

export const isValidMove = ({piece, action, state}) => {
  switch(piece.type) {
    case pawn.TYPE:
      return pawn.isValidMove({piece, action, state});
    case knight.TYPE:
      return knight.isValidMove({piece, action, state});
    case bishop.TYPE:
      return bishop.isValidMove({piece, action, state});
    case rook.TYPE:
      return rook.isValidMove({piece, action, state});
    case king.TYPE:
      return king.isValidMove({piece, action, state});
    case queen.TYPE:
      return queen.isValidMove({piece, action, state});
    default:
      return false;
  }
};
