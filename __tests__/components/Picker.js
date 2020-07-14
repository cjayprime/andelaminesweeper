import React from 'react';
import Picker from '../../src/components/Picker';

import renderer from 'react-test-renderer';

jest.useFakeTimers();
describe('Picker Test', () => {
    test('Stability', () => {
        const tree = renderer.create(
            <Picker
                open={() => {}}
                difficulty={'Easy'}
                onChange={() => {}}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});