import '../utilities/piece';
import * as piece from '../validators/piece';

let isOnBoard       = ({rank, file}) => inRanks(rank) && inFiles(file);
let downRange       = ({rank, file}) => R.range(0, R.min(rank, file));
let upRange         = ({rank, file}) => R.range(0, 8 - R.max(rank, file));
let genDiagonal     = R.curry(({rank, file}, num) => ({ rank: rank + num, file: file + num }));
let genDownDiagonal = R.curry(({rank, file}, num) => genDiagonal(-num));

let diagonalDown    = piece => R.filter(isOnBoard, R.map(genDownDiagonal(piece), downRange(piece)));
let diagonalUp      = piece => R.filter(isOnBoard, R.map(genDiagonal(piece), upRange(piece)));
let diagonalFor     = piece => R.concat(diagonalDown(piece), diagonalUp(piece));
let isOnDiagonal    = R.curry((move, {rank, file}) => rank === move.rank && file === move.file);

let areBetween  = R.curry(({piece, move}, otherPiece) => {
  let minRank = R.min(piece, move.rank);
  let maxRank = R.max(piece, move.rank);
  let minFile = R.min(piece, move.file);
  let maxFile = R.max(piece, move.file);

  return minRank < otherPiece.rank < maxRank || minFile < otherPiece.file < maxFile;
});

let isDiagonal = R.curry(({piece, state}, move) => {
  return R.any(isOnDiagonal(move), diagonalFor(piece)));
});

let hasClearPassage = ({piece, state}, move) => {
  let diagonal = diagonalFor(piece);
  let piecesOnDiagonal = R.filter(piece => piece.rank - move.rank === piece.file - move.file, state);

  return R.none(areBetween({piece, move}), piecesOnDiagonal);
};

export const isValidBishopMove = R.allPass([isDiagonal, hasClearPassage]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidBishopMove]), R.T],
  [R.T, R.F]
]);
