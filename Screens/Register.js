import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const clearAll = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConPassword('');
  };
  const handleSingUp = async () => {
    try {
      if (
        name === '' ||
        email === '' ||
        phone === '' ||
        password === '' ||
        conPassword === ''
      ) {
        alert('Please fill all required fields');
      } else {
        if (password === conPassword) {
          const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
          auth().currentUser.sendEmailVerification();
          alert(
            'Please verify your email.\nVerification email has been sent to your email address!',
          );
          let docRef = 'DoctorList/' + name;
          database().ref(docRef).set({
            Name: name,
            Email: email,
          });

          clearAll();
        } else {
          alert('Passwords are not matching');
        }
      }
    } catch (error) {
      if (
        error.code === 'auth/email-already-exists' ||
        error.code === 'auth/email-already-in-use'
      ) {
        alert('The email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        alert('The email address is invalid!');
        return;
      }
      if (error.code === 'auth/weak-password') {
        alert('Password must be at least 6 characters!');
        return;
      }
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {/* <StatusBar backgroundColor={'red'} /> */}
        <Image
          source={require('../Images/care.png')}
          style={[styles.logo, {marginTop: 20}]}></Image>
        <Text style={{fontSize: 30, color: 'blue', fontWeight: '700'}}>
          MedCare App
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: 30,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Text
          style={{
            marginLeft: -100,
            fontSize: 30,
            color: 'black',
            fontWeight: '600',
          }}>
          Let's Get Started
        </Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={text => setName(text)}
          style={[styles.input, {marginTop: 20}]}></TextInput>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="gray"
          value={phone}
          maxLength={13}
          keyboardType="numeric"
          onChangeText={text => setPhone(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          maxLength={10}
          onChangeText={text => setPassword(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry
          maxLength={10}
          value={conPassword}
          onChangeText={text => setConPassword(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TouchableOpacity
          style={[styles.button, {marginTop: 20}]}
          onPress={handleSingUp}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          flexDirection: 'row',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Text style={{fontSize: 15, marginTop: 40, color: 'black'}}>
          Already have an account?
        </Text>
        <TouchableOpacity
          style={{marginTop: 40}}
          onPress={() => {
            clearAll(), navigation.navigate('login');
          }}>
          <Text style={{fontSize: 15, color: 'blue'}}> Login here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'white',
    backgroundColor: '#009AEE',
    padding: 10,
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  logo: {
    width: '50%',
    height: 100,
    marginTop: -100,
    resizeMode: 'contain',
  },
});

export default Register;
