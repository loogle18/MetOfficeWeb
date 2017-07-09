import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import GoogleMap from './GoogleMap';
import GoogleMapReact from 'google-map-react';

describe('GoogleMap', () => {
  const props = { center: { lat: 11.2358, lng: 85.3211 }, zoom: 11 }

  it('does not render Marker if no need', () => {
    const googleMap = shallow(<GoogleMap marker={false} {...props} />)

    assert(googleMap.find(GoogleMapReact).length)
    assert(!googleMap.find('Marker').length)
  })

  it('renders Marker if need', () => {
    const googleMap = shallow(<GoogleMap marker={true} {...props} />)

    assert(googleMap.find(GoogleMapReact).length)
    assert(googleMap.find('Marker').length)
  })
})
