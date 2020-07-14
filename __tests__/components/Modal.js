import React from 'react';
import {View} from 'react-native';

import Modal from '../../src/components/Modal';

import renderer from 'react-test-renderer';

jest.useFakeTimers();
describe('Modal Test', () => {
    test('Stability', () => {
        const tree = renderer.create(
            <Modal
                onClose={() => {}}
                animate={false}
            ><View></View></Modal>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});