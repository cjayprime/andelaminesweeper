import React, {Component} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';

import Animation from './Animation';

import * as Style from '../assets/styles';

export default class Modal extends Component {
  render() {
    const {onClose, children, animate} = this.props;
    return (
      <>
        <StatusBar hidden={true} />
        <TouchableOpacity
          onPress={onClose}
          style={Style.modal.modalContainer}
        />
        {animate ? (
          <Animation>{children}</Animation>
        ) : (
          <View style={Style.modal.popover}>{children}</View>
        )}
      </>
    );
  }
}
