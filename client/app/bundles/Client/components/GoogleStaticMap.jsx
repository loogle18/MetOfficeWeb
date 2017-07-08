import React, { Component, PropTypes } from 'react';

import { GOOGLE_MAPS_API_KEY, GOOGLE_STATIC_MAP_ROOT_URL } from '../constants/clientConstants';

class GoogleStaticMap extends Component {
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }

  get staticMapUrl() {
    const { latitude, longitude, zoom } = this.props
    const markerParams = `markers=icon:https://png.icons8.com/marker/office/30%7Cshadow:true%7C${latitude},${longitude}`
    return `${GOOGLE_STATIC_MAP_ROOT_URL}?center=${latitude},${longitude}&zoom=${zoom}&scale=1&size=320x200&maptype=roadmap&format=png&language=en&${markerParams}&key=${GOOGLE_MAPS_API_KEY}`;
  }

  render() {
    return (
      <img
        src={this.staticMapUrl}
      />
    );
  }
}

export default GoogleStaticMap;
