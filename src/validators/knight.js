import '../utilities/piece';
import * as piece from '../validators/piece';

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

let isLShapedMove = R.curry(({piece, state}, move) => {
  return R.any(R.filter(samePosition(move), validKnightMoves(piece)));
});

export const isValidMove = R.cond([
  [R.allPass([piece.isValidMove, isLShapedMove]), R.T],
  [R.T, R.F]
]);
