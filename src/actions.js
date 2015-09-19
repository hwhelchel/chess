export const MOVE_PIECE = 'MOVE_PIECE';
export const TAKE_PIECE = 'TAKE_PIECE';
export const FREEZE_PIECE = 'FREEZE_PIECE';
export const UNFREEZE_PIECE = 'UNFREEZE_PIECE';

export function movePiece(color, id, destinationRank, destinationFile) {
  return { type: MOVE_PIECE, color, id, destinationRank, destinationFile };
}

export function takePiece(color, id) {
  return { type: TAKE_PIECE, color, id };
}

export function freezePiece(color, id) {
  return { type: FREEZE_PIECE, color, id };
}

export function unfreezePiece(color, id) {
  return { type: MOVE_PIECE, color, id };
}
