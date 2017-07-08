import React, { Component, PropTypes } from 'react';
import { lightBlue500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme({palette: {primary1Color: lightBlue500}})}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
