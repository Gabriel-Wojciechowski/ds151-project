import React, {useEffect, useState} from 'react';
import { Text } from 'react-native-elements';
import { View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import DefaultImage from '../components/DefaultImage';
import StarCount from '../components/StarCount';
import SearchBar from '../components/SearchBar';
import gitlab from '../api/gitlab';

const FullListScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { 
    getProjects("");
  }, []);

  async function getProjects(query){
    const response = await gitlab.get(`/projects?search=${query}`);
    setResults(response.data);
  }

  return(
    <>
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => getProjects(t)}
      />
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
                <DefaultImage borderRadius={8} uri={item.avatar_url}/>
                <View style={styles.itemText}>
                  <Text>{item.name_with_namespace}</Text>
                  <Text>Visibility: {item.visibility}</Text>
                </View>
                <StarCount count={item.star_count} size={16} id={item.id}/>

              </TouchableOpacity>
          );
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  searchButton: {
    borderWidth: 1.5,
    borderRadius: 25,
    padding: 8,
    margin: 10
  },
  item:{
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10
  },
  itemText:{
    flex: 1,
    marginLeft: 10,
  },
});

export default FullListScreen;