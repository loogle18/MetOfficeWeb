import { assert } from 'chai';

import { getLocation } from '../helpers/clientHelpers';

describe('getLocation', () => {
  it('formats location values and converts them to numbers ', () => {
    const location = { lat: '52.139', lon: '-4.570', amsl: '133' }
    const result = getLocation(location)

    assert.equal(result.locationCenter.lat, 52.139)
    assert.equal(result.locationCenter.lng, -4.570)
    assert.equal(result.locationZoom, 12)
  })

  it('sets locationZoom to 12 if location.amsl is null', () => {
    const location = { lat: '52.139', lon: '-4.570', amsl: null }
    const locationZoom = getLocation(location).locationZoom

    assert.equal(locationZoom, 12)
  })

  it('sets locationZoom to 12 if location.amsl / 10 less than 7', () => {
    const location = { lat: '52.139', lon: '-4.570', amsl: '50' }
    const locationZoom = getLocation(location).locationZoom

    assert.equal(locationZoom, 12)
  })

  it('sets locationZoom to 12 if location.amsl / 10 more than 12', () => {
    const location = { lat: '52.139', lon: '-4.570', amsl: '130' }
    const locationZoom = getLocation(location).locationZoom

    assert.equal(locationZoom, 12)
  })

  it('sets locationZoom to location.amsl / 10 expression result if it in the range from 7 to 12', () => {
    const location = { lat: '52.139', lon: '-4.570', amsl: '115' }
    const locationZoom = getLocation(location).locationZoom

    assert.equal(locationZoom, 11.5)
  })
})
