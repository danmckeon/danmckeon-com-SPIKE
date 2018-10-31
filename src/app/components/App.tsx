import * as React from 'react';
import injectSheet from 'react-jss';

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

type Props = {
  classes?: any;
};

@injectSheet(styles)
export default class App extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <header className="appHeader">
          <h1 className={classes.appTitle}>Hello React World4</h1>
        </header>
        <p className={classes.appIntro}>Here's some content</p>
      </div>
    );
  }
}
