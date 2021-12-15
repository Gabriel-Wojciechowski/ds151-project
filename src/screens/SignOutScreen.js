import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../context/AuthContext';

const SignOutScreen = () => {
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    signOut();
  },[])

  return(
    <></>
  );
}

export default SignOutScreen;