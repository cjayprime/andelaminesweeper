import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';

import Modal from './Modal';

import {checked} from '../assets/images';
import * as Style from '../assets/styles';

const Picker = (props) => {
  const {onChange, difficulty, open} = props;
  const options = ['Easy', 'Medium', 'Hard'];

  return (
    <Modal onClose={open}>
      {options.map((text, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onChange(text)}
          style={Style.picker.item}>
          <Text style={Style.picker.text}>{text}</Text>
          {text === difficulty && (
            <Image source={checked} style={Style.picker.image} />
          )}
        </TouchableOpacity>
      ))}
    </Modal>
  );
};

export default Picker;
