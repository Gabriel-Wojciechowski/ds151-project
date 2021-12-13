import React from 'react';
import { Image, StyleSheet } from 'react-native';

const DefaultImage = ({uri, borderRadius}) => {
  return(
    <Image
      style={[styles.image, {borderRadius: borderRadius}]}
      source={{
        uri
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  }
});

export default DefaultImage;