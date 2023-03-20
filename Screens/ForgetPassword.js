import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState();
  const navigation = useNavigation();

  const forgotPassword = () => {
    try {
      if (!email) {
        alert('Error' + ' Please enter email first');
      } else {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            alert('Reset password email has been sent to: ' + email);
            setEmail('');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              alert('Invalid Email!' + '\nPlease enter correct email!');
            }
            if (error.code === 'auth/user-not-found') {
              alert('Error!' + '\nEmail not found!');
            }
          });
      }
    } catch (error) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-not-found'
      ) {
        alert('Error!' + '\nPlease enter correct email!');
        return;
      }
    }
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.TextStyle}>Reset Password!</Text>
      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        autoCapitalize="none"
        importantForAutofill="auto"
        autoCorrect={false}
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>

      <TouchableOpacity
        style={[styles.button, {marginTop: 20}]}
        onPress={forgotPassword}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>Reset password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.loginbutton, {marginTop: 30}]}
        onPress={() => navigation.navigate('login')}>
        <Text
          style={{
            fontSize: 25,
            textDecorationLine: 'underline',
            color: 'blue',
            fontWeight: '500',
          }}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  TextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 0,
    textAlign: 'center',
    color: 'black',
    margin: 0,
  },
  input: {
    width: '90%',
    height: 50,
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'white',
    backgroundColor: '#009AEE',
    padding: 10,
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  loginbutton: {
    alignItems: 'center',
    backgroundColor: 'white',
    // backgroundColor: '#009AEE',
    padding: 10,
    width: '90%',
    height: 60,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 5,
  },
});
