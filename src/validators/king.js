import * as piece from '../utilities/piece';
import * as pieceValidator from '../validators/piece';
import * as rook from './rook';

let isUnMoved       = R.pipe(piece.findPiece, R.prop('isTouched'), R.equals(false));
let isRookTarget    = ({action, state}) => R.pipe(piece.atDestination, R.whereEq({type: 'rook', isTouched: false, color: R.prop('color', action)}));

let notInCheck = R.F;

let hasUnattackedPassage = ({action, state}) => {
  let movedPiece = piece.findPiece({action, state});
  let max = R.max(movedPiece.file, action.file);
  let min = R.min(movedPiece.file, action.file);

  let fileRange       = R.range(min, max);
  let attackingPieces = piece.areAttacking({action, state}, fileRange);

  return R.isEmpty(attackingPieces);
};

let isCastling = R.allPass([isUnMoved, isRookTarget, rook.isRankClear, notInCheck, hasUnattackedPassage]);

let changedRank = R.either(piece.didMove('rank', 1), piece.didMove('rank', -1));

let didMoveOne = R.cond([
  [changedRank, R.either(piece.didMoveOver(1), piece.didMoveOver(0))],
  [R.T, piece.didMoveOver(1)]
]);

let isValidKingMove = R.anyPass([didMoveOne, isCastling]);

export const isValidMove = R.cond([
  [R.allPass([pieceValidator.isValidMove, isValidKingMove]), R.prop('action')],
  [R.T, piece.reset]
]);
