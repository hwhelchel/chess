import { MOVE_PIECE, TAKE_PIECE, FREEZE_PIECE, UNFREEZE_PIECE } from './actions';
import { initialState } from './initialState';

export function karateChess(state = initialState, action) {
  switch(action.type) {
  case MOVE_PIECE:
    return state;
  case TAKE_PIECE:
    return state;
  case FREEZE_PIECE:
    return state;
  case UNFREEZE_PIECE:
    return state;
  default:
    return state;
  }
}
