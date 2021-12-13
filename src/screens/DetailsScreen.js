import React, { useEffect, useState } from 'react';
import { StyleSheet, Linking, ScrollView, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import StarCount from '../components/StarCount';
import DefaultImage from '../components/DefaultImage';
import gitlab from '../api/gitlab';

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const DetailsScreen = ({ navigation, route }) => {
  const [item, setItem] = useState({namespace: {name: ""}});

  useEffect(() => { 
    getItem(route.params.id);
  }, []);

  async function getItem(id) {
    const response = await gitlab.get(`/projects/${id}`);
    setItem(response.data);
  }

  return(
    <>
      <ScrollView style={styles.view}>
        <View style={styles.topFlex}>
          {item.avatar_url && <DefaultImage borderRadius={8} uri={item.avatar_url}/>}
          {typeof(item.star_count) !== 'undefined' && <StarCount count={item.star_count} size={24} id={item.id}/>}
        </View>
        <Text style={styles.item}><B>Name:</B> {item.name}</Text>
        <Text style={styles.item}><B>Visibility:</B> {item.visibility}</Text>
        <Text style={styles.item}><B>Created by:</B> {item.namespace.name}</Text>
      </ScrollView>
      <Button 
          style={styles.item}
          title="Acessar perfil"
          onPress={() => Linking.openURL(item.web_url)}/>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 10
  },
  item: {
    margin: 4
  },
  topFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4
  },
  star:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  starNumber: {
    fontSize: 24,
    paddingRight: 5,
  }
});

export default DetailsScreen;