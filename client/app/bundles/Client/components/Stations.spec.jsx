import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import Stations from './Stations'

describe('Stations', () => {
  const props = {
    route: {
      data: [
        { id: 1, name: 'Aberporth', location: { lat: '52.139', lon: '4.570', amsl: '133' } },
        { id: 2, name: 'Armagh', location: { lat: '25.391', lon: '5.470', amsl: '17' } },
        { id: 3, name: 'Bradford', location: { lat: '11.192', lon: '7.750', amsl: '240' } },
        { id: 4, name: 'Braemar', location: { lat: '13.921', lon: '11.540', amsl: '90' } }
      ]
    }
  }
  const stations = shallow(<Stations {...props} />)
  const stationsLength = props.route.data.length
  const searchStationsBy = (value) => {
    stations.find('TextField').simulate('change', { target: { value: value} } )
  }

  it('renders AppBar with title and search field', () => {
    assert.equal(stations.find('AppBar').prop('title'), `MetOffice: ${stationsLength} stations`)
    assert(stations.find('TextField').length)
  })

  it('renders StationCard for each station', () => {
    assert.equal(stations.find('StationCard').length, stationsLength)
  })

  it('filters stations by name on TextField search', () => {
    searchStationsBy('Abe')
    assert.equal(stations.find('StationCard').length, 1)
    assert.equal(stations.find('StationCard').prop('name'), 'Aberporth')

    searchStationsBy('Bra')
    assert.equal(stations.find('StationCard').length, 2)
    assert.equal(stations.find('StationCard').first().prop('name'), 'Bradford')
    assert.equal(stations.find('StationCard').last().prop('name'), 'Braemar')

    searchStationsBy('')
    assert.equal(stations.find('StationCard').length, stationsLength)
  })
})
