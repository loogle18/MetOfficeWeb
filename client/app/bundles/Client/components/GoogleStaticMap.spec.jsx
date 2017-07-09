import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import GoogleStaticMap from './GoogleStaticMap';
import { GOOGLE_MAPS_API_KEY, GOOGLE_STATIC_MAP_ROOT_URL } from '../constants/clientConstants';

describe('GoogleStaticMap', () => {
  it('renders image with static map sorce', () => {
    const googleStaticMap = shallow(<GoogleStaticMap latitude={11.2358} longitude={85.3211} zoom={11} />)
    const firtsPartUrl = `${GOOGLE_STATIC_MAP_ROOT_URL}?center=11.2358,85.3211&zoom=11&scale=1&`
    const secondPartUrl = 'size=320x200&maptype=roadmap&format=png&language=en&markers=icon:'
    const thirdPartUrl = 'https://png.icons8.com/marker/office/30%7Cshadow:true%7C11.2358,85.3211&key='
    const srcStaticMapUrl = firtsPartUrl + secondPartUrl + thirdPartUrl + GOOGLE_MAPS_API_KEY

    assert.equal(googleStaticMap.find('img').prop('src'), srcStaticMapUrl)
  })
})
