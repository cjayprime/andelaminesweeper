import React from 'react';
import {View} from 'react-native';
import Animation from '../../src/components/Animation';

import renderer from 'react-test-renderer';

jest.useFakeTimers();
describe('Animation Test', () => {
    test('Stability', async () => {
        const tree = renderer.create(
            <Animation>
                <View/>
            </Animation>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    
        // jest.useFakeTimers();
        // setTimeout(() => {
        //      expect(component.state().fruits).toEqual(fruits);
        // }, 1500);
        // jest.runAllTimers();
    });
});