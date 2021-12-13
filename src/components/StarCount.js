import React, {useEffect, useState} from 'react';
import { Text } from 'react-native-elements';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import gitlab from '../api/gitlab';

const StarCount = ({count, size, id}) => {
  const [starred, setStarred] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setStars(count);
  }, []);
  
  function flipStar(){
    if(!starred) {
      setStars(stars+1);            // não deu pra fazer ele realmente mudar no gitlab pela api, desculpa :c
    } else {
      setStars(stars-1);
    }
    setStarred(!starred);
  }

  return(
    <TouchableOpacity 
      style={styles.star}
      onPress={() => flipStar()}
    >
      <Text style={[styles.starNumber, {fontSize: size}]}>{stars}</Text>
      {starred ? <FontAwesome name="star" size={24} color="black" /> : <FontAwesome name="star-o" size={24} color="black" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  star:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  starNumber: {
    padding: 5,
  }
});

export default StarCount;