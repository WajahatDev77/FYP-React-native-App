import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import {ScrollView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
import database from '@react-native-firebase/database';
let docRef = database().ref('/DoctorList');

const PatientRegistration = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    docRef.on('value', snapshot => {
      let dat = snapshot.val();
      const items = Object.keys(dat);
      setUsers(items.sort());
    });
  }, []);

  var data = [users];
  docRef.on('value', snapshot => {
    let dat = snapshot.val();
    const obj = Object.values(dat);
    for (let i of obj) {
      if (i.Name === text) {
        setText(i.Email);
      }
    }
  });

  const clearAll = () => {
    setName('');
    setAge('');
    setAddress('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConPassword('');
    setDescription('');
  };
  const handleSingUp = async () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }
    //today date
    let TodayDate = year + '-' + month + '-' + date;
    try {
      if (
        name === '' ||
        age === '' ||
        address === '' ||
        email === '' ||
        phone === '' ||
        password === '' ||
        conPassword === '' ||
        description === ''
      ) {
        alert('Please fill all required fields');
      } else {
        if (password === conPassword) {
          if (password.length < 6 && conPassword.length < 6) {
            alert('Passwords must have at least 6 characters');
          } else {
            database()
              .ref('Doctor/')
              .push({
                AllSensorsData: {
                  Date: {
                    '2022-11-24': {
                      BloodPressure: {
                        '16:04:14': 100,
                      },
                      HeartRate: {
                        '16:03:14': 70,
                      },
                      SpO2: {'16:03:14': 87},
                      Temperature: {
                        '16:03:14': 35,
                      },
                    },
                  },
                },
                Name: name,
                age: age,
                address: address,
                Email: email,
                phone: phone,
                Password: password,
                description: description,
                docEmail: text,
                BP: 0,
                HR: 0,
                SpO2: 0,
                Temp: 0,
              });

            alert('Data added successfully');
            clearAll();
          }
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
          flex: 1,
          marginTop: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Text
          style={{
            marginLeft: -80,
            fontSize: 30,
            color: 'black',
            fontWeight: '600',
          }}>
          Register a Patient
        </Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={text => setName(text)}
          style={[styles.input, {marginTop: 20}]}></TextInput>
        <TextInput
          placeholder="Age"
          placeholderTextColor="gray"
          maxLength={3}
          value={age}
          keyboardType="numeric"
          onChangeText={text => setAge(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Address"
          placeholderTextColor="gray"
          value={address}
          onChangeText={text => setAddress(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="gray"
          maxLength={13}
          value={phone}
          keyboardType="numeric"
          onChangeText={text => setPhone(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          maxLength={10}
          value={password}
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
        <TextInput
          placeholder="Description"
          placeholderTextColor="gray"
          value={description}
          multiline
          numberOfLines={5}
          onChangeText={text => setDescription(text)}
          style={[styles.input, {marginTop: 10}]}></TextInput>
      </View>
      <View
        style={{
          flex: 0.5,
          marginBottom: '30%',
          width: '90%',
          marginLeft: '5%',
          marginTop: 10,
        }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
          Select Doctor
        </Text>
        <DropdownMenu
          data={data}
          bgColor={'white'}
          tintColor={'black'}
          activityTintColor={'black'}
          handler={(selection, row) => setText(data[selection][row])}
        />
        <TouchableOpacity
          style={[styles.button, {marginTop: 20, marginTop: '50%'}]}
          onPress={handleSingUp}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default PatientRegistration;
