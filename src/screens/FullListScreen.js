import React, {useEffect, useState} from 'react';
import { Text } from 'react-native-elements';
import { View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Moment from 'moment';
import DefaultImage from '../components/DefaultImage';
import StarCount from '../components/StarCount';
import SearchBar from '../components/SearchBar';
import gitlab from '../api/gitlab';
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused } from "@react-navigation/native";

const FullListScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [text, setText] = useState('');
  const [option, setOption] = useState('updated_at');

  const [orderOptions, setOrderOptions] = useState([
    {"label": "Last updated", "option": "updated_at"},
    {"label": "Last created", "option": "created_at"},
    {"label": "Name", "option": "name"},
    {"label": "Oldest updated", "option": "updated_at&sort=asc"},
    {"label": "Oldest created", "option": "created_at&sort=asc"},
  ]);

  useEffect(() => { 
    if(isFocused){
      setIsLoading(true);
      getProjects("", "updated_at");
    }
  }, [isFocused]);

  async function getProjects(query, opt){
    const response = await gitlab.get(`/projects?search=${query}&order_by=${opt}`);
    setResults(response.data);
    setIsLoading(false);
  }
  
  return(
    <>
      <Dropdown
        data={orderOptions}
        labelField={"label"}
        valueField={"option"}
        onChange={(item) => {
          setIsLoading(true);
          setOption(item.option);
          getProjects(text, item.option);
        }}
        placeholder={"Order by"}
        style={styles.dropdown}
      />
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => {
          setIsLoading(true);
          getProjects(t, option);
        }}
      />
      {isLoading ? <Text style={styles.loading}>Loading...</Text> : 
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
                    <Text>Last updated at: {Moment(item.last_activity_at).format('DD/MM/yyyy')}</Text>
                  </View>
                  <StarCount count={item.star_count} size={16} id={item.id}/>

                </TouchableOpacity>
            );
          }}
        />
      }
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
  itemText:{
    flex: 1,
    marginLeft: 10,
  },
  dropdown: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    margin: 10,
  },
  loading:{
    flex: 1,
    alignSelf: 'center'
  }
});

export default FullListScreen;