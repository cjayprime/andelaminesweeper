import {Platform} from 'react-native';

export const TILE_SIZE = 20;
export const HEADER_HEIGHT = Platform.select({
  android: 56,
  default: 44,
});
