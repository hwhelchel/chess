import * as piece from '../utilities/piece';

let doesNotMakeKingVulnerable = ({action, state}) => {
  let king = R.find(piece.isOwnKing(action), state);
  return R.none(piece.willBeAttackingKing(king))(R.filter(R.complement(piece.areOwnPieces(action)), state));
};

let isNotOccupiedByMover = ({action, state}) => R.none(piece.samePosition(action))(R.filter(piece.areOwnPieces(action), state));
let isOnBoard = ({action, state}) => piece.inRanks(action.rank) && piece.inFiles(action.file);

export const isValidMove = R.cond([
  [R.allPass([isOnBoard, isNotOccupiedByMover, doesNotMakeKingVulnerable]), R.T],
  [R.T, R.F]
]);
