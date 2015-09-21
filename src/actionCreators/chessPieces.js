import { MOVE_PIECE, TAKE_PIECE, FREEZE_PIECE, UNFREEZE_PIECE } from '../actions';

export function movePiece(id, file, rank) {
  return { type: MOVE_PIECE, id, file, rank };
}

export function takePiece(id) {
  return { type: TAKE_PIECE, id };
}

export function freezePiece(id) {
  return { type: FREEZE_PIECE, id };
}

export function unfreezePiece(id) {
  return { type: UNFREEZE_PIECE, id };
}
