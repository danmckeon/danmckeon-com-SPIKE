import * as React from 'react';
import injectSheet from 'react-jss';
import logo from './logo.svg';

// .App-logo {
//   animation: App-logo-spin infinite 20s linear;
//   height: 40vmin;
// }

// .App-header {
//   background-color: #282c34;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: white;
// }

// .App-link {
//   color: #61dafb;
// }

const styles = {
  app: {
    textAlign: 'center'
  },
  appIntro: {
    color: 'red'
  },
  appTitle: {
    color: 'yellow'
  }
};

interface IProps {
  classes?: any;
}

@injectSheet(styles)
export default class App extends React.Component<IProps, {}> {
  public render() {
    const { classes } = this.props;
    return (
      <div className="app">
        <header className="appHeader">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className={classes.appTitle}>Hello React World3</h1>
        </header>
        <p className={classes.appIntro}>Here's some content</p>
      </div>
    );
  }
}
