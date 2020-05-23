import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';

import * as Card from './';

const getByTestID = (component, ID) => {
    return(component.findWhere((node) => node.prop('testID') === `${ID}` ))
}

describe('Card', () => {
    const title = "test"
    const subtitle = "test2"

    it('should render action button', () => {
        const component = mount(<Card.Component title={title} subtitle={subtitle} renderPrimaryAction={() => (<Text testID="primary-action">Test</Text>)} />)
        const primaryAction = getByTestID(component, "primary-action");

        expect(primaryAction).toBeTruthy();
    });

    it('should render secondary action button', () => {
        const component = mount(<Card.Component title={title} subtitle={subtitle} renderSecondaryAction={() => (<Text testID="secondary-action">Test</Text>)} />)
        const secondaryAction = getByTestID(component, "secondary-action");

        expect(secondaryAction).toBeTruthy();
    });

    it('should render button', () => {
        const component = mount(<Card.Component title={title} subtitle={subtitle} renderButton={() => (<Text testID="button">Test</Text>)} />)
        const button = getByTestID(component, "button");

        expect(button).toBeTruthy();
    });

    it('should render title and subtitle should be in all caps', () => {
        const component = mount(<Card.Component title={title} subtitle={subtitle} />)
        const titleComponent = getByTestID(component, "layout-card-title");
        const subtitleComponent = getByTestID(component, "layout-card-subtitle");

        expect(titleComponent.last().text()).toBe("TEST");
        expect(subtitleComponent.last().text()).toBe("TEST2");
    });

});

describe('Card Button', () => {
    const onPress = jest.fn();

    it('should do onPress function', () => {
        const component = mount(<Card.Button title="test" onPress={onPress} />)

        component.last().props().onPress();

        expect(onPress).toHaveBeenCalled();
    });

});
