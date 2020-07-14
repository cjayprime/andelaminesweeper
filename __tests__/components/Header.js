import React from 'react';
import Header from '../../src/components/Header';

import renderer from 'react-test-renderer';

jest.useFakeTimers();
describe('Header Test', () => {
    test('Stability', () => {
        const tree = renderer.create(
            <Header
                open={() => {}}
                clear={false}
                difficulty={'Easy'}
                onChange={() => {}}
                mines={100}
                pause={false}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});