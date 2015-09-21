import { BLACK_TYPE, WHITE_TYPE } from './types';

import * as white from './cartographers/white';
import * as black from './cartographers/black';

export const isUnderAttack = (color, state) => {
  switch(color) {
    case BLACK_TYPE:
      return black.isUnderAttack(state);
    case WHITE_TYPE:
      return white.isUnderAttack(state);
    default:
      return [];
  }
};

export const inCheck = (color, state) => {
  switch(color) {
    case BLACK_TYPE:
      return black.inCheck(state);
    case WHITE_TYPE:
      return white.inCheck(state);
    default:
      return [];
  }
};
