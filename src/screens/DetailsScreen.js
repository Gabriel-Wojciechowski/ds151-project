import React, { useEffect, useState } from 'react';
import { StyleSheet, Linking, ScrollView, View, FlatList, LogBox } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import Moment from 'moment';
import StarCount from '../components/StarCount';
import DefaultImage from '../components/DefaultImage';
import gitlab from '../api/gitlab';

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const DetailsScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({namespace: {name: ""}});
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getProject(route.params.id);
    getCommits(route.params.id, "");
  }, []);

  async function getProject(id) {
    const project = await gitlab.get(`/projects/${id}`);
    setItem(project.data);
    const branches = await gitlab.get(`/projects/${id}/repository/branches`);
    setBranches(branches.data);
  }

  async function getCommits(id, query){
    const commits = await gitlab.get(`/projects/${id}/repository/commits?ref_name=${query}`);
    setCommits(commits.data);
    setIsLoading(false);
  }

  return(
    <>
      <ScrollView style={styles.view}>
        <View style={styles.topFlex}>
         {item.avatar_url && <DefaultImage borderRadius={8} size={50} uri={item.avatar_url}/>}
         {typeof(item.star_count) !== 'undefined' && <StarCount count={item.star_count} size={24} id={item.id}/>}
        </View>
        <Text style={styles.item}><B>Name:</B> {item.name}</Text>
        <Text style={styles.item}><B>Visibility:</B> {item.visibility}</Text>
        <Text style={styles.item}><B>Created by:</B> {item.namespace.name}</Text>
        <Text style={styles.item}><B>Created at:</B> {Moment(item.created_at).format('DD MMM yyyy HH:mm:ss')}</Text>
        <Text style={styles.item}><B>Last updated at:</B> {Moment(item.last_activity_at).format('DD MMM yyyy HH:mm:ss')}</Text>
        <Dropdown
          data={branches}
          labelField={"name"}
          valueField={"name"}
          onChange={(item) => {
            setIsLoading(true);
            getCommits(route.params.id, item.name);
          }}
          placeholder={"Select current branch"}
          style={styles.dropdown}
        />
        {isLoading ? <Text style={styles.loading}>Loading...</Text> :
          <View style={styles.item}>
            <B>Last commits</B>
            <FlatList
              data={commits}
              keyExtractor={item => item.id.toString()}
              nestedScrollEnabled={true}
              renderItem={({ item }) => {
                return(
                  <View style={styles.commitItem}>
                    <Text>{item.title}</Text>
                    <Text><B>By:</B> {item.committer_name}</Text>
                  </View>
                );
              }}
            />
          </View>
        }
      </ScrollView>
      <Button 
        style={styles.item}
        title="Access project"
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
  commitItem: {
    margin: 4,
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  topFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4
  },
  loading:{
    flex: 1,
    alignSelf: 'center'
  }
});

export default DetailsScreen;