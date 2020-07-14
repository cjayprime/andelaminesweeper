import React, {Component} from 'react';
import {Animated, Dimensions, Easing} from 'react-native';

import * as Style from '../assets/styles';

export default class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: new Animated.Value(Dimensions.get('window').height),
      scaleY: new Animated.Value(1),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.pulsate();
    }, 100);
  }

  pulsate = () => {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.easeOut,
    }).start(() => {
      const {scaleY} = this.state;
      Animated.sequence([
        Animated.timing(scaleY, {
          toValue: 1.4,
          duration: 125,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 125,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1.4,
          duration: 125,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 125,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  render() {
    const {children} = this.props;
    const {translateY, scaleY} = this.state;
    return (
      <Animated.View
        style={[
          Style.animation,
          {
            transform: [
              {
                translateY,
              },
              {
                scaleY,
              },
            ],
          },
        ]}>
        {children}
      </Animated.View>
    );
  }
}
