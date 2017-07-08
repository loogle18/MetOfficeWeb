import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import { getLocation } from '../helpers/clientHelpers';
import StationCard from './StationCard'
import css from './Stations.scss'

class Stations extends Component {
  state = {
    stations: this.props.route.data
  }

  handleOnChange = (event) => {
    const value = event.target.value

    if (!value) this.setState({ stations: this.props.route.data })

    const filteredStations = this.props.route.data.filter((station) => station.name.toLowerCase().includes(value.toLowerCase()))

    this.setState({ stations: filteredStations })
  }

  renderStations() {
    const stations = this.state.stations.map((station) => {
      const {locationCenter, locationZoom} = getLocation(station.location)
      return <StationCard
               key={station.id}
               id={station.id}
               locationCenter={locationCenter}
               locationZoom={locationZoom}
               name={station.name}
             />
    })
    return stations
  }

  render() {
    return(
      <div>
        <AppBar
          title={`MetOffice: ${this.props.route.data.length} stations`}
          iconElementLeft={<IconButton href='/'><ActionHome /></IconButton>}
        />
        <div className={css.searchWrapper}>
          <TextField
            onChange={this.handleOnChange}
            hintText='Search stations by name'
            floatingLabelText='Search'
            fullWidth={true}
          />
        </div>
        <div className={css.cardsWrapper}>
          {this.renderStations()}
        </div>
      </div>
    )
  }
}

export default Stations;
