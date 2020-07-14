import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';

import * as Style from '../assets/styles';

import {Constants} from '../utils';

export default class Button extends Component {
  render() {
    const height = Constants.HEADER_HEIGHT;
    const {image, label, onPress} = this.props;
    return (
      <View style={Style.button.container}>
        <TouchableOpacity
          onPress={onPress}
          style={[Style.button.click, {height: 0.7 * height}]}>
          <Text style={Style.button.text}>{label}</Text>
          {image && <Image source={image} style={Style.button.image} />}
        </TouchableOpacity>
      </View>
    );
  }
}
