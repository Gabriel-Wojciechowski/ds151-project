import React, {useEffect, useState} from 'react';
import { Text } from 'react-native-elements';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import gitlab from '../api/gitlab';

const StarCount = ({count, fontSize, id}) => {
  const [starred, setStarred] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setStars(count);
    checkStarred(id);
  }, []);

  async function checkStarred(){
    const response = await gitlab.get(`/projects?starred=true`);
    setStarred(false);
    response.data.forEach(element => {
      if(id === element.id)
        setStarred(true);
    });
  }
  
  async function flipStar(){
    try{
      if(!starred) {
        await gitlab.post(`/projects/${id}/star`);
        setStars(stars+1);
      } else {
        await gitlab.post(`/projects/${id}/unstar`);
        setStars(stars-1);
      }
      setStarred(!starred);
    } catch(e) {
      if(e.response.status == 304){
        if(!starred) {
          setStars(stars+1);
        } else {
          setStars(stars-1);
        }
        setStarred(!starred);
      }
    }
  }

  return(
    <TouchableOpacity 
      style={styles.star}
      onPress={() => flipStar()}
    >
      <Text style={[styles.starNumber, {fontSize}]}>{stars}</Text>
      {starred ? <FontAwesome name="star" size={24} color="gold" /> : <FontAwesome name="star-o" size={24} color="white" />}
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
    color:'white'
  }
});

export default StarCount;