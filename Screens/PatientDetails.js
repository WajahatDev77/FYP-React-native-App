import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';

const Patient = ({route}) => {
  const item = route.params.item;
  const itemKey = route.params.keyValue;
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [bp, setBp] = useState(0);
  const [dbp, setDBp] = useState(0);
  const [hr, setHr] = useState(0);
  const [spo2, setSpO2] = useState(0);
  const [temp, setTemp] = useState(0);
  const [dkey, setData] = useState('');
  const [docEmail, setdocEmail] = useState('');
  const [uid, setUid] = useState('');

  let docRef = database().ref('/Doctor');
  useEffect(() => {
    docRef.on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.keys(data);
      setUid(items);
      console.log(uid[uid.length - 1]);
      const obj = Object.values(data);
      for (let i of obj) {
        if (i.Name === item.Name) {
          setAddress(i.address);
          setAge(i.age);
          setPhone(i.phone);
          setDescription(i.description);
          setBp(i.BP);
          setDBp(i.DBP);
          setHr(i.HR);
          setSpO2(i.SpO2);
          setTemp(i.Temp);
          setData(item.key);
          setdocEmail(i.docEmail);
        }
      }
    });
  }, []);

  const check = () => {
    if (dkey === uid[uid.length - 1] || itemKey === uid[uid.length - 1]) {
      navigation.navigate('graphs');
    } else alert('Not connected to watch');
  };
  const deleteUser = () => {
    console.log(dkey);
    let userRef = database().ref('Doctor/' + dkey);

    Alert.alert('Delete user', 'Do you want to delete the user?', [
      {
        text: 'Yes',
        onPress: () =>
          userRef.remove().then(() => {
            alert('User deleted successfully');
            navigation.navigate('drawer', {user: docEmail});
          }),
        style: 'cancel',
      },
      {text: 'No', onPress: () => console.log('')},
    ]);
  };
  return (
    <ScrollView style={styles.itemsList}>
      <Text
        style={[
          styles.itemtext,
          {textAlign: 'center', fontSize: 25, fontWeight: '700'},
        ]}>
        Pateint Details
      </Text>
      <Text style={styles.itemtext}>Name: {item.Name}</Text>
      <Text style={styles.itemtext}>Address: {address}</Text>
      <Text style={styles.itemtext}>Age: {age}</Text>
      <Text style={styles.itemtext}>Phone no: {phone}</Text>
      <Text style={styles.itemtext}>Description: {description}</Text>
      <Text style={styles.itemtext}>BP(systolic): {bp}</Text>
      <Text style={styles.itemtext}>BP(diastolic): {dbp}</Text>
      <Text style={styles.itemtext}>HR: {hr}</Text>
      <Text style={styles.itemtext}>SpO2: {spo2}</Text>
      <Text style={styles.itemtext}>Temp: {temp}</Text>
      {/* <Text style={styles.itemtext}>Key: {itemKey || dkey}</Text> */}
      <TouchableOpacity
        style={[styles.button, {marginTop: 40}]}
        onPress={check}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>Show Graphs</Text>
      </TouchableOpacity>
      {dkey === undefined ? (
        console.log('')
      ) : (
        <TouchableOpacity
          style={[styles.button, {marginTop: 10}]}
          onPress={deleteUser}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>Delete User</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, {marginTop: 10, marginBottom: 50}]}
        onPress={() => navigation.navigate('login')}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    marginTop: 50,
    marginLeft: 30,
  },
  itemtext: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'left',
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
    marginTop: 10,
  },
});

export default Patient;
