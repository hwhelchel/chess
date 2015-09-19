export const MOVE_PIECE = 'MOVE_PIECE';
export const TAKE_PIECE = 'TAKE_PIECE';
export const FREEZE_PIECE = 'FREEZE_PIECE';
export const UNFREEZE_PIECE = 'UNFREEZE_PIECE';

export function movePiece(id, destination) {
  return { type: MOVE_PIECE, id, destination };
}

export function takePiece(id) {
  return { type: TAKE_PIECE, id };
}

export function freezePiece(id) {
  return { type: FREEZE_PIECE, id };
}

export function unfreezePiece(id) {
  return { type: MOVE_PIECE, id };
}
