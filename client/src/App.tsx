import * as React from 'react';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello React World2</h1>
        </header>
        <p className="App-intro">Here's some content</p>
      </div>
    );
  }
}

export default App;
