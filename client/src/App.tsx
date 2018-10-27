import * as React from 'react';
import injectSheet from 'react-jss';
import logo from './logo.svg';

const styles = {
  container: {
    marginBottom: 60
  }
};

@injectSheet(styles)
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
