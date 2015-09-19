import React, { Component } from 'react';
import { store } from './store';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world.</h1>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
