import React from 'react';
import { Image, StyleSheet } from 'react-native';

const DefaultImage = ({uri, borderRadius, size}) => {
  return(
    <Image
      style={{
        borderRadius, 
        height: size, 
        width: size
      }}
      source={{
        uri
      }}
    />
  );
}

export default DefaultImage;