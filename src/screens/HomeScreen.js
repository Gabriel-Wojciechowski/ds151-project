import React, {useEffect, useState} from 'react';
import { Text } from 'react-native-elements';
import { View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import DefaultImage from '../components/DefaultImage';
import gitlab from '../api/gitlab';

const HomeScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);

  useEffect(() => { 
    getProjects();
  }, []);

  async function getProjects(){
    const response = await gitlab.get('/projects?owned=true');
    setResults(response.data);
  }

  return(
    <>
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return(
              <TouchableOpacity 
                onPress={() => navigation.navigate("Project Details",{
                  id: item.id
                })}
                style={styles.item}
              >
                {item.avatar_url && <DefaultImage borderRadius={8} size={50} uri={item.avatar_url}/>}
                <View style={styles.itemText}>
                  <Text>{item.name_with_namespace}</Text>
                  <Text>Visibility: {item.visibility}</Text>
                </View>

              </TouchableOpacity>
          );
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  item:{
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  itemText:{
    flex: 1,
    marginLeft: 10,
  }
});

export default HomeScreen;