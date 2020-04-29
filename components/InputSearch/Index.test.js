import React from 'react';
import { mount } from 'enzyme';
import InputSearch from './';

const getByTestID = (component, ID) => {
    return(component.findWhere((node) => node.prop('testID') === `${ID}` ))
}

describe('Input Search', () => { 
    const mockFn = jest.fn();

    const component = mount(<InputSearch onChangeText={(e) => mockFn(e)} />);
    const input = getByTestID(component, "InputSearch");

    it('Render', () => {
        expect(input).toBeTruthy();
    });

    it('Interaction', () => {
        component.props().onChangeText("test");
        expect(mockFn).toHaveBeenCalledWith("test");
    });

});
