import { createStore } from 'redux';
import { karateChess } from './reducers';
import { movePiece, takePiece, freezePiece, unfreezePiece } from './actions';


let store = createStore(karateChess);

console.log(store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// Dispatch some actions
store.dispatch(movePiece(2, 'a7'));
store.dispatch(takePiece(15));
store.dispatch(freezePiece(14));
store.dispatch(unfreezePiece(12));

// Stop listening to state updates
unsubscribe();
