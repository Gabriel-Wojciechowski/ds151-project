import React, { useEffect, useState } from 'react';
import { StyleSheet, Linking, ScrollView, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import DefaultImage from '../components/DefaultImage';
import gitlab from '../api/gitlab';

const ProfileScreen = ({ navigation, route }) => {
  const [item, setItem] = useState({owner: ""});

  useEffect(() => { 
    getItem();
  }, []);

  async function getItem() {
    const response = await gitlab.get(`/user`);
    setItem(response.data);
  }

  return(
    <>
      <ScrollView contentContainerStyle={styles.view}>
        {item.avatar_url && <DefaultImage borderRadius={25} uri={item.avatar_url}/>}
        <Text style={styles.item}>{item.name}</Text>
        <View style = {styles.lineStyle} />
        <Text style={styles.item}>@{item.username}</Text>
        <Text style={styles.item}>{item.bio}</Text>
        <Text style={styles.item}>{item.email}</Text>
        <Text style={styles.item}>{item.twitter}</Text>
        <View style={styles.followerBox}>
          <Text style={styles.followerBoxItem}>{item.followers} followers</Text>
          <Text style={styles.followerBoxItem}>{item.following} following</Text>
        </View>
      </ScrollView>
      <Button 
        title="Acessar perfil"
        onPress={() => Linking.openURL(item.web_url)}/>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 10,
    alignItems: 'center',
  },
  lineStyle:{
    width: '75%',
    borderWidth: 0.5,
    borderColor:'gray',
    margin:10,
  },
  img: {
    borderRadius: 25,
  },
  item: {
    margin: 4
  },
  followerBox: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  followerBoxItem:{
    margin:8,
    marginLeft: 15,
    marginRight: 15
  }
});

export default ProfileScreen;