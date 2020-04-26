import React from 'react';
import {shallow} from 'enzyme';
import Button from './index.js';

const press = jest.fn();

const getByTestID = (component, ID) => {
    return(component.findWhere((node) => node.prop('testID') === `${ID}` ))
}

describe('Button', () => {

        describe('Disabled', () => {
            const component = shallow(<Button title="Test" onPress={press} disabled/>);
            const button = getByTestID(component, "button-disabled")

            it('Render', () => {
                expect(button).toBeTruthy();
                expect(button.text()).toBe("Test");
            });

            it('Interaction', () => {
                expect(component.props().onPress).toBeFalsy();
            });
        });

        describe('Processing', () => {
            const component = shallow(<Button title="Test" onPress={press} processing/>);
            const button = getByTestID(component, "button-processing")

            it('Render', () => {
                expect(button).toBeTruthy();
            });

            it('Interaction', () => {
                expect(component.props().onPress).toBeFalsy();
            });
        });

        describe('Default', () => {
            const component = shallow(<Button title="Test" onPress={press} />);
            const button = getByTestID(component, "button-default")

            it('Render', () => {
                expect(button).toBeTruthy();
                expect(button.text()).toBe("Test");
            });
            
            it('Interaction', () => {
                component.props().onPress();
                expect(press).toHaveBeenCalled();
            });
        });

});
