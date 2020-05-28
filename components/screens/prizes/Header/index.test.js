/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import PrizesHeader from './';

const getByTestID = (component, ID) => {
  return(component.findWhere((node) => node.prop('testID') === `${ID}` ))
};

describe('Prizes Header', () => {
  it('should have bold font if prop available equals true', () => {
    const component = mount(<PrizesHeader available={true} />);
    const available = getByTestID(component, "prizes-available");

    expect(available.last().prop('style')[0].fontFamily).toBe("poppins-bold");
  });
  it('should have bold font if prop received equals true', () => {
    const component = mount(<PrizesHeader received={true} />);
    const received = getByTestID(component, "prizes-received");

    expect(received.last().prop('style')[0].fontFamily).toBe("poppins-bold");
  });
});
