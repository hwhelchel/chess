import * as piece from './piece.js';

export const TYPE = 'bishop';

// let diagonalFor = p => {
//   let rank = Number(p.rank);
//   let file = p.file;



//   // [{rank: toString(++rank), file: piece.nextChar(file) },
//   //  {rank: toString()}]




// };

// let diagonals = R.memoize(R.compose(R.uniq, R.flatten, R.map(diagonalFor)));


// let isDiagonal = ({action, state}) => {
//   let movedPiece = piece.findPiece({action, state});

// };

let hasClearPassage = R.F;
let isDiagonal = R.F;

let isValidBishopMove = R.allPass([isDiagonal, hasClearPassage]);

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isValidBishopMove]), R.prop('action')],
  [R.T, piece.reset]
]);
