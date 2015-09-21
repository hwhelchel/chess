import '../utilities/piece';
import * as piece from '../validators/piece';

let sameRank = didMove('rank', 0);
let sameFile = didMove('file', 0);

let isFileClear = R.curry(({piece, state}, move) => {
  let max = R.max(piece.rank, move.rank);
  let min = R.min(piece.rank, move.rank);

  let rankRange    = R.range(min, max);
  let piecesOnFile = R.filter(piece => piece.file === move.file, state);
  let piecesRanks  = R.map(piece => piece.rank, piecesOnFile);
  return R.none(R.intersection(rankRange, piecesRanks));
});

export const isRankClear = R.curry(({piece, state}, move) => {
  let max = R.max(piece.file, move.file);
  let min = R.min(piece.file, move.file);

  let fileRange    = R.range(min, max);
  let piecesOnRank = R.filter(piece => piece.rank === move.rank, state);
  let piecesFiles  = R.map(piece => piece.file, piecesOnRank);
  return R.none(R.intersection(fileRange, piecesFiles));
});

let hasClearPassage = R.cond([
  [sameRank, isFileClear],
  [sameFile, isRankClear],
  [R.T, R.F]
]);

export const isValidRookMove = R.allPass([R.either([sameRank, sameFile]), hasClearPassage]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidRookMove]), R.T],
  [R.T, R.F]
]);
