import * from './actions';

const initialState = {
  chessPieces: [
    {id: 1, color: 'white', type: 'pawn',    rank: '2', file: 'a'},
    {id: 2, color: 'white', type: 'pawn',    rank: '2', file: 'b'},
    {id: 3, color: 'white', type: 'pawn',    rank: '2', file: 'c'},
    {id: 4, color: 'white', type: 'pawn',    rank: '2', file: 'd'},
    {id: 5, color: 'white', type: 'pawn',    rank: '2', file: 'e'},
    {id: 6, color: 'white', type: 'pawn',    rank: '2', file: 'f'},
    {id: 7, color: 'white', type: 'pawn',    rank: '2', file: 'g'},
    {id: 8, color: 'white', type: 'pawn',    rank: '2', file: 'h'},
    {id: 9, color: 'white', type: 'rook',    rank: '1', file: 'a'},
    {id: 10, color: 'white', type: 'rook',   rank: '1', file: 'h'},
    {id: 11, color: 'white', type: 'bishop', rank: '1', file: 'c'},
    {id: 12, color: 'white', type: 'bishop', rank: '1', file: 'f'},
    {id: 13, color: 'white', type: 'knight', rank: '1', file: 'b'},
    {id: 14, color: 'white', type: 'knight', rank: '1', file: 'g'},
    {id: 15, color: 'white', type: 'king',   rank: '1', file: 'd'},
    {id: 16, color: 'white', type: 'queen',  rank: '1', file: 'e'},
    {id: 17, color: 'black', type: 'pawn',   rank: '7', file: 'a'},
    {id: 18, color: 'black', type: 'pawn',   rank: '7', file: 'b'},
    {id: 19, color: 'black', type: 'pawn',   rank: '7', file: 'c'},
    {id: 20, color: 'black', type: 'pawn',   rank: '7', file: 'd'},
    {id: 21, color: 'black', type: 'pawn',   rank: '7', file: 'e'},
    {id: 22, color: 'black', type: 'pawn',   rank: '7', file: 'f'},
    {id: 22, color: 'black', type: 'pawn',   rank: '7', file: 'g'},
    {id: 23, color: 'black', type: 'pawn',   rank: '7', file: 'h'},
    {id: 24, color: 'black', type: 'rook',   rank: '8', file: 'a'},
    {id: 25, color: 'black', type: 'rook',   rank: '8', file: 'h'},
    {id: 26, color: 'black', type: 'bishop', rank: '8', file: 'c'},
    {id: 27, color: 'black', type: 'bishop', rank: '8', file: 'f'},
    {id: 28, color: 'black', type: 'knight', rank: '8', file: 'b'},
    {id: 29, color: 'black', type: 'knight', rank: '8', file: 'g'},
    {id: 30, color: 'black', type: 'king',   rank: '8', file: 'e'},
    {id: 31, color: 'black', type: 'queen',  rank: '8', file: 'd'}
  ]
}
