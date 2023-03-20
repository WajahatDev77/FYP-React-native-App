import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from './Screens/Login';
import Register from './Screens/Register';
import PatientDetails from './Screens/PatientDetails';
import PatientList from './Screens/PatientList';
import AllPatientList from './Screens/AllPatientList';
import PatientRegistration from './Screens/PatientRegistration';
import ForgotPasswordScreen from './Screens/ForgetPassword';
import {NavigationContainer} from '@react-navigation/native';
import DrawerScreen from './Screens/DrawerScreen';
import Graphs from './Screens/Graphs';
import SelectedDateGraph from './Screens/SelectedDateGraph';

const App = () => {
  const Stack = createStackNavigator();

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
          backgroundColor: '#fff',
        }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="patientDetails" component={PatientDetails} />
        <Stack.Screen name="patientlist" component={PatientList} />
        <Stack.Screen name="allpatientlist" component={AllPatientList} />
        <Stack.Screen name="registerPatient" component={PatientRegistration} />
        <Stack.Screen name="forgetpassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="drawer" component={DrawerScreen} />
        <Stack.Screen name="graphs" component={Graphs} />
        <Stack.Screen name="selectedgraph" component={SelectedDateGraph} />
        {/* <Stack.Screen name="patientDetails" component={PatientDetails} /> */}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
