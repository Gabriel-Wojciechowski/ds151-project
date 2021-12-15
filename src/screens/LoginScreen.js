import React, {useContext, useEffect, useState} from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-web';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {authState, signIn, tryLocalSignIn} = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  },[]);


  useEffect(() => {
    authState.error = null;
  },[password,username]);

  return(
    <SafeAreaView style={styles.form}>
        <Text style={styles.loginText}>Login</Text>
        <Input
          style={styles.textField}
          placeholder="Username"
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <Input
          style={styles.textField}
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry={true}
        />
        <Pressable
          style={styles.button}          
          onPress={() => {
            signIn({username, password});
          }}
        ><Text style={styles.text}>Entrar</Text></Pressable>
        {authState.error ? <Text style={styles.errorText}>{authState.error}</Text> : null} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,  
  },
  textField: {
    marginBottom: 15,
    padding: 7,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10
  },
  button:{
    width: 150,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center'
  },
  text:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',    
  },
  loginText:{
    color: '#303030',
    fontSize: 55,
    fontWeight: 'bold',
    paddingBottom: 20,    
  },
  errorText:{
    color: 'darkred',
    fontSize: 16,
    padding: 7,    
  }
});

export default LoginScreen;