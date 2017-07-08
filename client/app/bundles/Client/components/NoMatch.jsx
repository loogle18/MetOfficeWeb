import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class NoMatch extends Component {
  get actions() {
    return([
      <FlatButton
        href='/'
        label='Go home'
        primary={true}
      />
    ])
  }

  render() {
    return(
      <Dialog
        title='404'
        actions={this.actions}
        modal={false}
        open={true}
      >
        Requested page not found
      </Dialog>
    )
  }
}

export default NoMatch;
