import React from 'react';
import {mount} from 'enzyme';
import WalletIcon from './';

const onPress = jest.fn();

const getByTestID = (component, ID) => {
    return(component.findWhere((node) => node.prop('testID') === `${ID}` ))
}

describe('WalletIcon', () => {
    it('Render', () => {
        const component = mount(<WalletIcon color="#000000" onPress={onPress}/>);
        const icon = getByTestID(component, "wallet-icon");

        expect(icon).toBeTruthy();
    });

    it('should call onPress', () => {
        const component = mount(<WalletIcon color="#000000" onPress={onPress}/>);

        component.props().onPress();
        expect(onPress).toHaveBeenCalled();
    });
});
