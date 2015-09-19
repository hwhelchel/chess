import { compose, createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

import { movePiece, takePiece, freezePiece, unfreezePiece } from './actionCreators/chessPieces';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';

export const karateChess = combineReducers(reducers);

const finalCreateStore = compose(
  // Enables your middleware:
  // applyMiddleware(m1, m2, m3), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export const store = finalCreateStore(karateChess);

console.log(store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// Dispatch some actions
// store.dispatch(movePiece(2, 'a7'));
store.dispatch(takePiece(15));
store.dispatch(freezePiece(14));
store.dispatch(unfreezePiece(12));

// Stop listening to state updates
unsubscribe();
