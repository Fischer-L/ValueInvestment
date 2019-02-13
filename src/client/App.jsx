import React, { Component } from 'react';

import MainBar from '@/components/MainBar';
import '@/css/App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainBar />
      </div>
    );
  }
}

export default App;
