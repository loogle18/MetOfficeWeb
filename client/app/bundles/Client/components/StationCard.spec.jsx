import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import StationCard from './StationCard';

describe('StationCard', () => {
  it('renders StationCard components with GoogleStaticMap', () => {
    const props = {
      id: 1,
      name: 'Station',
      locationCenter: { lat: 11.2358, lng: 85.3211 },
      locationZoom: 11
    }
    const card = shallow(<StationCard {...props} />).find('Card')

    assert(card.find('GoogleStaticMap').length)
    assert.equal(card.find('CardTitle').prop('title'), props.name)
    assert.equal(card.find('CardActions').find('FlatButton').prop('href'), `stations/${props.id}`)
  })
})
