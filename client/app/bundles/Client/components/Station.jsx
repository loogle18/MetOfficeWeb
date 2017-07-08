import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { getLocation } from '../helpers/clientHelpers';
import GoogleMap from './GoogleMap'
import css from './Map.scss'

class Station extends Component {
  renderClimates() {
    const climates = this.props.route.data.climates.map((climate) => {
      return(
        <TableRow key={climate.year}>
          <TableRowColumn>{climate.year}</TableRowColumn>
          <TableRowColumn>{`${climate.temp_max} \xB0C`}</TableRowColumn>
          <TableRowColumn>{`${climate.temp_min} \xB0C`}</TableRowColumn>
          <TableRowColumn>{`${climate.rain} mm`}</TableRowColumn>
          <TableRowColumn>{`${climate.af_days} days`}</TableRowColumn>
          <TableRowColumn>{`${climate.sun_hours} hours`}</TableRowColumn>
        </TableRow>
      )
    })
    return climates
  }

  render() {
    const { locationCenter, locationZoom } = getLocation(this.props.route.data.location)

    return(
      <div>
        <AppBar
          title={`MetOffice: ${this.props.route.data.name}`}
          iconElementLeft={<IconButton href='/'><NavigationArrowBack /></IconButton>}
        />
        <div className={css.bigMapWrapper}>
          <GoogleMap
            center={locationCenter}
            zoom={locationZoom}
            marker={true}
          />
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Year</TableHeaderColumn>
              <TableHeaderColumn>Max temp</TableHeaderColumn>
              <TableHeaderColumn>Min temp</TableHeaderColumn>
              <TableHeaderColumn>Rainfall</TableHeaderColumn>
              <TableHeaderColumn>Days of air frost</TableHeaderColumn>
              <TableHeaderColumn>Sunshine</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderClimates()}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Station;
