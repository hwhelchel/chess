import * as piece from './piece.js';

export const TYPE = 'rook';

let sameRank = piece.didMove('rank', 0);
let sameFile = piece.didMove('file', 0);

let isFileClear = ({action, state}) => {
  let rankRange    = R.range(piece.findPiece({action, state}).rank, action.rank);
  let piecesOnFile = R.filter(piece => piece.file === action.file, state);
  let piecesRanks  = R.map(piece => piece.rank, piecesOnFile);
  return R.none(R.intersection(rankRange, piecesRanks));
};

let isRankClear = ({action, state}) => {
  let fileRange    = R.range(piece.findPiece({action, state}).file, action.file);
  let piecesOnRank = R.filter(piece => piece.rank === action.rank, state);
  let piecesFiles  = R.map(piece => piece.file, piecesOnRank);
  return R.none(R.intersection(fileRange, piecesFiles));
};

let hasClearPassage = R.cond([
  [sameRank, isFileClear],
  [sameFile, isRankClear],
  [R.T, R.F]
]);

let isValidRookMove = R.allPass([R.either([sameRank, sameFile]), hasClearPassage]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidRookMove]), R.prop('action')],
  [R.T, piece.reset]
]);
