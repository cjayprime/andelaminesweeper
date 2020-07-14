import React from 'react';
import Button from '../../src/components/Button';
import {arrowDown} from '../../src/assets/images';

import renderer from 'react-test-renderer';

jest.useFakeTimers();
describe('Button Test', () => {
    test('Stability', () => {
        const tree = renderer.create(
            <Button
                label={'Easy'}
                onPress={() => {}}
                image={arrowDown}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});