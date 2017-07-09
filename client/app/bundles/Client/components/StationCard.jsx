import React, { Component } from 'react';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import GoogleStaticMap from './GoogleStaticMap';

import css from './Map.scss';

class StationCard extends Component {
  render() {
    const { id, locationCenter, locationZoom, name } = this.props

    return(
      <div>
        <Card>
          <div className={css.smallMapWrapper}>
            <GoogleStaticMap
              latitude={locationCenter.lat}
              longitude={locationCenter.lng}
              zoom={locationZoom}
            />
          </div>
          <CardTitle title={name} />
          <CardActions>
            <FlatButton label='Show' href={`stations/${id}`} fullWidth={true} primary={true} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default StationCard;
