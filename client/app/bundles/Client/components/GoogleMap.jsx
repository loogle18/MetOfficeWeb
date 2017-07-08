import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAPS_API_KEY } from '../constants/clientConstants';
import css from './Map.scss'

const Marker = () => (
  <div className={css.marker} />
)

class GoogleMap extends Component {
  static propTypes = {
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    marker: PropTypes.bool,
  }

  renderMarker() {
    if (this.props.marker) return <Marker lat={this.props.center.lat} lng={this.props.center.lng} />
  }

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        center={this.props.center}
        zoom={this.props.zoom}
      >
        {this.renderMarker()}
      </GoogleMapReact>
    );
  }
}

export default GoogleMap;
