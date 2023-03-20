import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
let docRef = database().ref('/Doctor');

const AllPatientList = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    docRef.on('value', snapshot => {
      var li = [];
      snapshot.forEach(child => {
        li.push({
          key: child.key,
          Name: child.val().Name,
          DocEmail: child.val().docEmail,
        });
      });
      setUsers(li);
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          marginTop: 20,
          //backgroundColor: 'lightgrey',
          width: '100%',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Patient's List
      </Text>
      <FlatList
        style={{marginTop: 20, width: '100%'}}
        data={users}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('patientDetails', {item: item})
                }>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                    backgroundColor: 'lightgrey',
                    margin: 2,
                    width: '100%',
                    textAlign: 'center',
                    padding: 10,
                  }}>
                  {item.Name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default AllPatientList;
