import React from 'react';

import AllPatientList from './AllPatientList';
import PatientRegistration from './PatientRegistration';
import LogOutButton from './LogOutButton';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Manage Patient"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Drawer.Screen name="Manage Patient" component={AllPatientList} />
      <Drawer.Screen name="Register Patient" component={PatientRegistration} />
      <Drawer.Screen name="LogOut" component={LogOutButton} />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
