import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import Station from './Station';
import { TableRowColumn } from 'material-ui/Table';

describe('Station', () => {
  const props = {
    route: {
      data: {
        id: 1,
        name: 'Station',
        location: { lat: '52.139', lon: '4.570', amsl: '133' },
        climates: [
          { year: 1967, temp_max: 13.07, temp_min: 5.58, rain: 75.38, af_days: 2.75, sun_hours: 103.82 },
          { year: 1966, temp_max: 12.82, temp_min: 5.82, rain: 86.09, af_days: 2.33, sun_hours: 104.14 },
          { year: 1965, temp_max: '---', temp_min: '---', rain: '---', af_days: '---', sun_hours: '---' }
        ]
      }
    }
  }
  const station = shallow(<Station {...props} />)

  it('renders AppBar with title, GoogleMap and Table components', () => {
    const googleMapLocation = station.find('GoogleMap').prop('center')

    assert.equal(station.find('AppBar').prop('title'), 'MetOffice: Station')
    assert.equal(googleMapLocation.lat, 52.139)
    assert.equal(googleMapLocation.lng, 4.57)
    assert(station.find('Table'))
  })

  it('renders Table with 6 columns', () => {
    assert.equal(station.find('Table').find('TableHeaderColumn').length, 6)
  })

  it('renders TableRow for each climate data with 6 TableRowColumn', () => {
    const tableBodyTableRow = station.find('TableBody').find('TableRow')

    assert.equal(tableBodyTableRow.length, props.route.data.climates.length)
    assert.equal(tableBodyTableRow.first().find('TableRowColumn').length, 6)
  })

  it('renders climate value with units if value not equal to "---"', () => {
    const tableBody = station.find('TableBody')
    const celsius = '\xB0C'

    assert(tableBody.contains(<TableRowColumn>{`13.07 ${celsius}`}</TableRowColumn>))
    assert(tableBody.contains(<TableRowColumn>{`5.58 ${celsius}`}</TableRowColumn>))
    assert(tableBody.contains(<TableRowColumn>75.38 mm</TableRowColumn>))
    assert(tableBody.contains(<TableRowColumn>2.75 days</TableRowColumn>))
    assert(tableBody.contains(<TableRowColumn>103.82 hours</TableRowColumn>))
  })

  it('renders climate value without units if value equal to "---"', () => {
    const tableBody = station.find('TableBody')
    const celsius = '\xB0C'

    assert(!tableBody.contains(<TableRowColumn>{`--- ${celsius}`}</TableRowColumn>))
    assert(!tableBody.contains(<TableRowColumn>{`--- ${celsius}`}</TableRowColumn>))
    assert(!tableBody.contains(<TableRowColumn>--- mm</TableRowColumn>))
    assert(!tableBody.contains(<TableRowColumn>--- days</TableRowColumn>))
    assert(!tableBody.contains(<TableRowColumn>--- hours</TableRowColumn>))
  })
})
