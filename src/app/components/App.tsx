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

type State = {
  toggle: boolean;
};

@injectSheet(styles)
export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false
    };
  }

  handleClick = e => {
    console.log('handleClick');
    console.log('this.state.toggle', this.state.toggle);
    this.setState({ toggle: true }, () => {
      console.log('this.state.toggle after setState', this.state.toggle);
    });
  };

  render() {
    const { classes } = this.props;
    console.log('here is a console log');
    console.log('heres antoher');

    return (
      <div className={classes.app}>
        <header className="appHeader">
          <h1 className={classes.appTitle}>Hello React World4</h1>
        </header>
        <button onClick={this.handleClick}>Test</button>
        <p className={classes.appIntro}>Here's some content</p>
        {this.state.toggle && <p>This text should only show after button clikc</p>}
      </div>
    );
  }
}
