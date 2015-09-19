import { initialState } from '../state/chessPieces';
import { MOVE_PIECE, TAKE_PIECE, FREEZE_PIECE, UNFREEZE_PIECE } from '../actions';

let rank              = R.prop('toRank');
let file              = R.prop('toFile');
let pieceById         = R.propEq('id');
let findPiece         = action => R.find(pieceById(action));
let otherPieces       = action => R.reject(pieceById(action));
let mutate            = R.flip(R.curryN(3, Object.assign)({}));
let setState          = mutator => (action, state) => [...otherPieces(action)(state), mutator(action, state)];

let isValidMove       = R.cond([[R.T, action => action]]);

let movedPiece        = (action, state) => mutate({ rank: rank(action), file: file(action) }, findPiece(action)(state));
let takenPiece        = mutate({ isTaken: true });
let frozenPiece       = mutate({ isFrozen: true });
let unfrozenPiece     = mutate({ isFrozen: false });

let move              = setState(movedPiece);
let take              = setState(takenPiece);
let withFrozenPiece   = setState(frozenPiece);
let withUnfrozenPiece = setState(unfrozenPiece);

let validateMove      = R.pipe(isValidMove, R.curry(move));

export const chessPieces = (state = initialState, action) => {
  switch(action.type) {
    case MOVE_PIECE:
      return validateMove(action)(state);
    case TAKE_PIECE:
      return take(action, state);
    case FREEZE_PIECE:
      return withFrozenPiece(action, state);
    case UNFREEZE_PIECE:
      return withUnfrozenPiece(action, state);
    default:
      return state;
  }
}
