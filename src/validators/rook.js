import * as piece from '../utilities/piece';
import * as pieceValidator from '../validators/piece';

let sameRank = piece.didMove('rank', 0);
let sameFile = piece.didMove('file', 0);

let isFileClear = ({action, state}) => {
  let movedPiece = piece.findPiece({action, state});
  let max = R.max(movedPiece.rank, action.rank);
  let min = R.min(movedPiece.rank, action.rank);

  let rankRange    = R.range(min, max);
  let piecesOnFile = R.filter(piece => piece.file === action.file, state);
  let piecesRanks  = R.map(piece => piece.rank, piecesOnFile);
  return R.none(R.intersection(rankRange, piecesRanks));
};

export const isRankClear = ({action, state}) => {
  let movedPiece = piece.findPiece({action, state});
  let max = R.max(movedPiece.file, action.file);
  let min = R.min(movedPiece.file, action.file);

  let fileRange    = R.range(min, max);
  let piecesOnRank = R.filter(piece => piece.rank === action.rank, state);
  let piecesFiles  = R.map(piece => piece.file, piecesOnRank);
  return R.none(R.intersection(fileRange, piecesFiles));
};

let hasClearPassage = R.cond([
  [sameRank, isFileClear],
  [sameFile, isRankClear],
  [R.T, R.F]
]);

export const isValidRookMove = R.allPass([R.either([sameRank, sameFile]), hasClearPassage]);

export const isValidMove = R.cond([
  [R.allPass([pieceValidator.isValidMove, isValidRookMove]), R.prop('action')],
  [R.T, piece.reset]
]);
