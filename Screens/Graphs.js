import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

LogBox.ignoreLogs(['Warning: ...']);
const Graphs = () => {
  const [HeartRateValues, setHeartRateValues] = useState([0]);
  const [HeartRateKeys, setHeartRateKeys] = useState([0]);
  const [SpO2Values, setSpO2Values] = useState([0]);
  const [SpO2Keys, setSpO2Keys] = useState([0]);
  const [BloodPressureValues, setBloodPressureValues] = useState([0]);
  const [BloodPressureKeys, setBloodPressureKeys] = useState([0]);
  const [TemperatureValues, setTemperatureValues] = useState([0]);
  const [TemperatureKeys, setTemperatureKeys] = useState([0]);
  const [SelectedDate, setSelectedDate] = useState();
  const today = new Date();
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(new Date(today));

  const navigation = useNavigation();

  var keys = [0],
    values = [0];
  //getting today date
  let dat = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  if (month < 10) {
    month = '0' + month;
  }
  if (dat < 10) {
    dat = '0' + dat;
  }
  //today date
   let TodayDate = year + '-' + month + '-' + dat;
  // let TodayDate = '2022-10-18';

  let dbHeartRate =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    TodayDate +
    '/HeartRate';
  let dbBP =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    TodayDate +
    '/BloodPressure';
  let dbSpO2 =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' + TodayDate + '/SpO2';
  let dbTemp =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    TodayDate +
    '/Temperature';

  // fetchData method to fetch data from database
  const fetchData = () => {
    database()
      .ref(dbHeartRate)
      .once('value', snapshot => {
        keys = [];
        values = [];
        snapshot.forEach(child => {
          keys.push(child.key);
          values.push(child.val());
        });
        setHeartRateKeys(keys);
        setHeartRateValues(values);
      });
    //Bp
    database()
      .ref(dbBP)
      .once('value', snapshot => {
        keys = [];
        values = [];
        snapshot.forEach(child => {
          keys.push(child.key);
          values.push(child.val());
        });
        setBloodPressureKeys(keys);
        setBloodPressureValues(values);
      });
    //SpO2
    database()
      .ref(dbSpO2)
      .once('value', snapshot => {
        keys = [];
        values = [];
        snapshot.forEach(child => {
          keys.push(child.key);
          values.push(child.val());
        });
        setSpO2Keys(keys);
        setSpO2Values(values);
      });
    //Temperature
    database()
      .ref(dbTemp)
      .once('value', snapshot => {
        keys = [];
        values = [];
        snapshot.forEach(child => {
          keys.push(child.key);
          values.push(child.val());
        });
        setTemperatureKeys(keys);
        setTemperatureValues(values);
      });
    // if (HeartRateKeys.length > 0 && HeartRateValues.length > 0)
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  //setting date
  const onChange = (event, Date) => {
    let selectedDate = Date.getDate();
    let selectedMonth = Date.getMonth() + 1;
    let selectedYear = Date.getFullYear();

    if (selectedMonth < 10) {
      selectedMonth = '0' + selectedMonth;
    }
    if (selectedDate < 10) {
      selectedDate = '0' + selectedDate;
    }

    let userSelectedDate =
      selectedYear + '-' + selectedMonth + '-' + selectedDate;
    setSelectedDate(userSelectedDate);
  };
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      onChange,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity
          style={[styles.button, {width: '50%'}]}
          value={date}
          onPress={() => showDatepicker()}>
          <Text style={styles.textbtn}>
            {SelectedDate ? SelectedDate : 'Select Date'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {marginLeft: '2%', width: '25%'}]}
          onPress={() =>
            navigation.navigate('selectedgraph', {selectedDate: SelectedDate})
          }>
          <Text style={styles.textbtn}>Search </Text>
        </TouchableOpacity>
      </View>
      {HeartRateKeys.length === 0 && HeartRateValues.length === 0 ? (
        <Text style={styles.text}>No Available Data For HeartRate</Text>
      ) : (
        <ScrollView horizontal={true}>
          <GraphicalDetails
            values={HeartRateValues}
            keys={HeartRateKeys}
            name="Heart Rate"
          />
        </ScrollView>
      )}

      {SpO2Keys.length === 0 && SpO2Values.length === 0 ? (
        <Text style={styles.text}>No Available Data For SpO2</Text>
      ) : (
        <ScrollView horizontal={true}>
          <GraphicalDetails values={SpO2Values} keys={SpO2Keys} name="SpO2" />
        </ScrollView>
      )}
      {BloodPressureKeys.length === 0 && BloodPressureValues.length === 0 ? (
        <Text style={styles.text}>No Available Data For BloodPressure</Text>
      ) : (
        <ScrollView horizontal={true}>
          <GraphicalDetails
            values={BloodPressureValues}
            keys={BloodPressureKeys}
            name="Blood Pressure"
          />
        </ScrollView>
      )}
      {TemperatureKeys.length === 0 && TemperatureValues.length === 0 ? (
        <Text style={styles.text}>No Available Data For Temperature</Text>
      ) : (
        <ScrollView horizontal={true}>
          <GraphicalDetails
            values={TemperatureValues}
            keys={TemperatureKeys}
            name="Temperature"
          />
        </ScrollView>
      )}
    </ScrollView>
  );
};
const GraphicalDetails = props => {
  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#FAF8F8',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FAE3E3',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = {
    labels: props.keys,
    datasets: [
      {
        data: props.values,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [props.name], // optional
  };
  return (
    <View>
      <LineChart
        data={data}
        width={655}
        height={260}
        //verticalLabelRotation={20}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  textbtn: {
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'white',
    backgroundColor: '#009AEE',
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 60,
    marginLeft: '10%',
  },
});

export default Graphs;
