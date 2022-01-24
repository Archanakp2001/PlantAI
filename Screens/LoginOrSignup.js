import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Header from '../Components/LoginOrSignup/Header'
import InputBox from '../Components/LoginOrSignup/InputBox';

function LoginOrSignup() {
  const email = require('../assets/images/login/email.png')
  const username = require('../assets/images/login/username.png')
  const password = require('../assets/images/login/password.png')
  return <View style = {styles.container}>
    <Header />
    <View style={styles.form}>
      <InputBox placeholder={'User name'} img = {username} />
      <InputBox placeholder={'Email Id'} img = {email} />
      <InputBox placeholder={'Password'} img = {password} />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
    paddingVertical: 10,
    borderRadius: 19,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    width: '90%'
    },
  form: {
    paddingVertical: 25
  }
});

export default LoginOrSignup;
