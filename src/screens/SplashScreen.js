import React, {useContext, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useIsFocused } from "@react-navigation/native";

const SplashScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {tryLocalSignIn} = useContext(AuthContext);

  useEffect(() => {
    if(isFocused)
      tryLocalSignIn();
  },[isFocused])

  return(
    <></>
  );
}

const styles = StyleSheet.create({
  
});

export default SplashScreen;