import React, {useState} from 'react';
import RadioForm from 'react-native-simple-radio-button';
import {LogBox} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
let docRef = database().ref('/Doctor');

LogBox.ignoreLogs(['Warning: ...']);
var userOption = null;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const options = [
    {label: 'Admin    ', value: 'admin'},
    {label: 'Doctor    ', value: 'doctor'},
    {label: 'Patient', value: 'patient'},
  ];
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Please fill all required fields');
        return;
      } else {
        const user = await auth().signInWithEmailAndPassword(email, password);
        if (user.user.emailVerified) {
          const useremail = firebase.auth().currentUser;
          navigation.navigate('patientlist', {user: useremail.email});
          setEmail(''), setPassword('');
        } else {
          firebase.auth().currentUser.sendEmailVerification();
          auth().signOut();
          alert(
            'Email Not Verified' +
              ' Verification email has been sent to your email address!',
          );
        }
      }
    } catch (error) {
      alert('Invalid Email or password!');
      return;
    }
  };

  var isCheck = false;
  var isAdmin = false;
  const adminLogin = () => {
    if (!email || !password) {
      alert('Please fill all required fields');
      return;
    } else {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        isAdmin = true;
      }
      if (isAdmin === false) alert('Invalid email or password');
      else if (isAdmin === true) {
        setEmail(''), setPassword('');
        navigation.navigate('drawer', {user: email});
      }
    }
  };

  const patientLogin = () => {
    docRef.on('value', snapshot => {
      if (!email || !password) {
        alert('Please fill all required fields');
        return;
      } else {
        let data = snapshot.val();
        const items = Object.keys(data);
        const obj = Object.values(data);
        var count = 0;
        let item;
        for (item of obj) {
          if (item.Email === email && item.Password === password) {
            isCheck = true;
            console.log(count);
            break;
          }
          count++;
        }
        if (isCheck === false) alert('Invalid email or password');
        else if (isCheck === true) {
          setEmail(''), setPassword('');
          navigation.navigate('patientDetails', {
            item: item,
            keyValue: items[count],
          });
        }
      }
    });
  };

  const userCheck = () => {
    if (userOption === 'doctor') handleLogin();
    else if (userOption === 'patient') patientLogin();
    else if (userOption === 'admin') adminLogin();
    else if (userOption === null) alert('Please select user type');
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 10,
        }}>
        <Image
          source={require('../Images/care.png')}
          style={[styles.logo, {marginTop: 30}]}></Image>
        <Text style={{fontSize: 30, color: 'blue', fontWeight: '700'}}>
          MedCare App
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontWeight: '600',
          }}>
          Login
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={[styles.input, {marginTop: 20}]}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}></TextInput>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          maxLength={10}
          style={[styles.input, {marginTop: 20}]}
          value={password}
          onChangeText={text => setPassword(text)}></TextInput>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 10,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
            User Type:
          </Text>
          <RadioForm
            style={{marginLeft: 0, paddingTop: 10}}
            radio_props={options}
            initial={-1} //initial value of this group
            formHorizontal={true}
            labelHorizontal={true}
            animation={false}
            onPress={value => {
              userOption = value;
            }} //if the user changes options, set the new value
          />
        </View>
        <TouchableOpacity
          style={[styles.button, {marginTop: 10}]}
          onPress={userCheck}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 30,
            width: '100%',
          }}
          onPress={() => {
            navigation.navigate('forgetpassword');
          }}>
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: 'underline',
              textAlign: 'right',
              color: 'blue',
            }}>
            Forget Password?
          </Text>
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
          marginTop: 15,
        }}>
        <Text style={{fontSize: 15, marginTop: 30, color: 'black'}}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          style={{marginTop: 30}}
          onPress={() => {
            setEmail(''), setPassword(''), navigation.navigate('register');
          }}>
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: 'underline',
              color: 'blue',
            }}>
            Create an account
          </Text>
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
    height: 50,
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

export default Login;
