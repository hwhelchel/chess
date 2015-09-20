import * as knight from './validators/knight';
import * as pawn   from './validators/pawn';
import * as bishop from './validators/bishop';
import * as rook   from './validators/rook';
import * as king   from './validators/king';
import * as queen  from './validators/queen';


let hasSameId = R.pipe(R.prop('id'), R.propEq('id'));
let findPiece = R.pipe(hasSameId, R.find);

export const isValidMove = ({action, state}) => {
  switch(findPiece(action)(state).type) {
    case pawn.TYPE:
      return pawn.isValidMove({action, state});
    case knight.TYPE:
      return knight.isValidMove({action, state});
    case bishop.TYPE:
      return bishop.isValidMove({action, state});
    case rook.TYPE:
      return rook.isValidMove({action, state});
    case king.TYPE:
      return king.isValidMove({action, state});
    case queen.TYPE:
      return queen.isValidMove({action, state});
    default:
      return false;
  }
};
