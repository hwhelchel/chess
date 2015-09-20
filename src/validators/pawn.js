import * as piece from './piece.js';

export const TYPE = 'pawn';

let hasSameId = R.pipe(R.prop('id'), R.propEq('id'));
let findPiece = ({action, state}) => R.find(piece => action.id === piece.id)(state);

let reset = ({action, state}) => {
  action.rank  = findPiece({action, state}).rank;
  action.file  = findPiece({action, state}).file;
  action.reset = true;
  return action;
};

let nextChar = char => String.fromCharCode(char.charCodeAt() + 1);
let lastChar = char => String.fromCharCode(char.charCodeAt() - 1);

let sameLocation = (piece, action) => {
  piece.rank === action.rank && piece.file === action.file;
};

let diffColor = (piece, action) => {
  piece.color !== action.color;
};

let isWhite           = R.pipe(R.path(['action', 'color']), R.equals('white'));
let isBlack           = R.pipe(R.path(['action', 'color']), R.equals('black'));
let isFirstRank       = R.pipe(R.path(['action', 'rank']),  R.equals(1));
let isLastRank        = R.pipe(R.path(['action', 'rank']),  R.equals(8));

let movedUpRank       = ({action, state}) => findPiece({action, state}).rank === action.rank - 1;
let movedRight        = ({action, state}) => nextChar(findPiece({action, state}).file) === action.file;
let movedLeft         = ({action, state}) => lastChar(findPiece({action, state}).file) === action.file;
let movedOverFile     = R.either([movedRight, movedLeft]);
let movedDownRank     = ({action, state}) => findPiece({action, state}).rank === action.rank + 1;

let isDiagonal        = R.cond([
  [isWhite, R.allPass([movedUpRank,   movedOverFile])],
  [isBlack, R.allPass([movedDownRank, movedOverFile])],
  [R.T, R.F]
]);
let isCapture         = ({action, state}) => R.any(piece => R.allPass([sameLocation, diffColor])(piece, action))(state);
let isUnoccupied      = ({action, state}) => R.none(piece => sameLocation(piece, action))(state);
let sameFile          = R.complement(movedOverFile);

let isForwardOne      = R.cond([
  [isWhite, R.allPass([movedUpRank,   sameFile])],
  [isBlack, R.allPass([movedDownRank, sameFile])],
  [R.T, R.F]
]);

let movedUpTwoRanks    = ({action, state}) => findPiece({action, state}).rank === action.rank - 2;
let movedDownTwoRanks  = ({action, state}) => findPiece({action, state}).rank === action.rank + 2;

const STARTING_RANKS  = [2, 7];
let isStartingRank    = R.pipe(R.equals, R.flip(R.find)(STARTING_RANKS));
let isFirstMove       = ({action, state}) => isStartingRank(findPiece({action, state}).rank);

// let isFirstMove       = ({action, state}) => {
//   R.pipe(findPiece, R.prop('rank'), isStartingRank)
//   isStartingRank(findPiece({action, state}).rank);
// }

let isForwardTwo      = R.cond([
  [isWhite, R.allPass([movedUpTwoRanks,   sameFile])],
  [isBlack, R.allPass([movedDownTwoRanks, sameFile])],
  [R.T, R.F]
]);

let isEighthRank      = R.cond([
  [isWhite, isLastRank],
  [isBlack, isFirstRank],
  [R.T, R.F]
]);

let enPassant         = R.F; // TODO En Passant;
let pawnPromotion     = R.allPass([isEighthRank, R.either([diagonalCapture, forwardUnoccupied])]);
let firstMoveTwo      = R.allPass([isForwardTwo, isUnoccupied, isFirstMove]);
let forwardUnoccupied = R.allPass([isForwardOne, isUnoccupied]);
let diagonalCapture   = R.allPass([isCapture, isDiagonal]);
let isValidPawnMove   = R.anyPass([enPassant, pawnPromotion, firstMoveTwo, forwardUnoccupied, diagonalCapture]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidPawnMove]), R.prop('action')],
  [R.T, reset]
]);
