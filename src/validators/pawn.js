import * as piece from './piece.js';

export const TYPE = 'pawn';

let reset = (piece, action) => {
  action.rank = piece.rank;
  action.file = piece.file;
};

let nextChar = (char) => {
  String.fromCharCode(char.charCodeAt() + 1);
};

let lastChar = (char) => {
  String.fromCharCode(char.charCodeAt() - 1);
};

let movedUpARow      = (piece, action) => piece.rank === action.rank - 1;
let movedRight       = (piece, action) => nextChar(piece.file) === action.file;
let movedLeft        = (piece, action) => lastChar(piece.file) === action.file;
let movedOverARow    = (piece, action) => movedRight(piece, action) || movedLeft(piece, action);
let movedDownARow    = (piece, action) => piece.rank === action.rank + 1;
let hasOpponentPiece = (action, state) => {
  R.find(piece => piece.rank === action.rank && piece.file === action.file && piece.color !== action.color)
};

let enPassant         = (action, state) => false;
let pawnPromotion     = (action, state) => false;
let firstMoveTwo      = (action, state) => false;
let forwardUnoccupied = (action, state) => false;

let diagonalCapture = (action, state) => {
  switch(action.color) {
    case 'white':
      return movedUpARow(piece, action) && movedOverARow(piece, action) && hasOpponentPiece(action, state);
    case 'black':
      return movedDownARow(piece, action) && movedOverARow(piece, action) && hasOpponentPiece(action, state);
    default:
      return false;
  }
};

let isValidPawnMove = (action, state) => R.anyPass([enPassant,
                                                           pawnPromotion,
                                                           firstMoveTwo,
                                                           forwardUnoccupied,
                                                           diagonalCapture]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidPawnMove]), (action, state) => action],
  [R.T, (action, state) => reset(piece, action)]
]);

// en passant
// promotion
// first move two squares forward
// forward to unoccupied
// diagonal capture
