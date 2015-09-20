import { initialState } from '../state/chessPieces';
import { isValidMove } from '../validators';
import { MOVE_PIECE, TAKE_PIECE, FREEZE_PIECE, UNFREEZE_PIECE } from '../actions';

let rank              = R.prop('rank');
let file              = R.prop('file');
let hasSameId         = R.pipe(R.prop('id'), R.propEq('id'));
let findPiece         = R.pipe(hasSameId, R.find);
let otherPieces       = R.pipe(hasSameId, R.reject);
let mutate            = R.flip(R.curryN(3, Object.assign)({}));
let setState          = R.curry((mutator, action, state) => [...otherPieces(action)(state), mutator(action, state)]);

let movedPiece        = (action, state) => mutate({ rank: rank(action), file: file(action) }, findPiece(action)(state));
let takenPiece        = mutate({ isTaken: true });
let frozenPiece       = mutate({ isFrozen: true });
let unfrozenPiece     = mutate({ isFrozen: false });

let move              = setState(movedPiece);
let take              = setState(takenPiece);
let withFrozenPiece   = setState(frozenPiece);
let withUnfrozenPiece = setState(unfrozenPiece);

export const chessPieces = (state = initialState, action) => {
  switch(action.type) {
    case MOVE_PIECE:
      return move(isValidMove({action, state}), state);
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
