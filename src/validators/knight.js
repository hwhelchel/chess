import * as piece from './piece.js';

export const TYPE = 'knight';

let validKnightMoves = ({rank, file}) => {
  return [{rank: rank - 1, file: file + 2},
          {rank: rank + 1, file: file + 2},
          {rank: rank - 1, file: file - 2},
          {rank: rank + 1, file: file - 2},
          {rank: rank + 2, file: file + 1},
          {rank: rank - 2, file: file - 1},
          {rank: rank + 2, file: file - 1},
          {rank: rank - 2, file: file + 1}];
};

let isLShapedMove = ({action, state}) => {
  let movedPiece = piece.findPiece({action, state});

  return R.any(R.filter(piece.samePosition(action), validKnightMoves(movedPiece)));
};

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isLShapedMove]), R.prop('action')],
  [R.T, piece.reset]
]);
