import * as piece from '../utilities/piece';
import * as pieceValidator from '../validators/piece';

let isOnBoard       = ({rank, file}) => piece.inRanks(rank) && piece.inFiles(file);
let downRange       = ({rank, file}) => R.range(0, R.min(rank, file));
let upRange         = ({rank, file}) => R.range(0, 7 - R.max(rank, file));
let genDiagonal     = R.curry(({rank, file}, num) => ({ rank: rank + num, file: file + num }));
let genDownDiagonal = R.curry(({rank, file}, num) => genDiagonal(-num));

let diagonalDown    = piece => R.filter(isOnBoard, R.map(genDownDiagonal(piece), downRange(piece)));
let diagonalUp      = piece => R.filter(isOnBoard, R.map(genDiagonal(piece), upRange(piece)));
let diagonalFor     = piece => R.concat(diagonalDown(piece), diagonalUp(piece));
let isOnDiagonal    = R.curry((action, {rank, file}) => rank === action.rank && file === action.file);

let isDiagonal = ({action, state}) => R.any(isOnDiagonal(action), diagonalFor(piece.findPiece({action, state})));
let areBetween  = R.curry(({movedPiece, action}, piece) => {
  let minRank = R.min(movedPiece.rank, action.rank);
  let maxRank = R.max(movedPiece.rank, action.rank);
  let minFile = R.min(movedPiece.file, action.file);
  let maxFile = R.max(movedPiece.file, action.file);

  return minRank < piece.rank < maxRank || minFile < piece.file < maxFile
});

let hasClearPassage = ({action, state}) => {
  let movedPiece = piece.findPiece({action, state});
  let diagonal = diagonalFor(movedPiece);
  let piecesOnDiagonal = R.filter(piece => piece.rank - action.rank === piece.file - action.file, state);

  return R.none(areBetween({movedPiece, action}), piecesOnDiagonal);
};

export const isValidBishopMove = R.allPass([isDiagonal, hasClearPassage]);

export const isValidMove = R.cond([
  [R.allPass([pieceValidator.isValidMove, isValidBishopMove]), R.prop('action')],
  [R.T, piece.reset]
]);
