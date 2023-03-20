import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

export default function SelectedDateGraph({route}) {
  const selectedDate = route.params.selectedDate;
  const [HeartRateValues, setHeartRateValues] = useState([0]);
  const [HeartRateKeys, setHeartRateKeys] = useState([0]);
  const [SpO2Values, setSpO2Values] = useState([0]);
  const [SpO2Keys, setSpO2Keys] = useState([0]);
  const [BloodPressureValues, setBloodPressureValues] = useState([0]);
  const [BloodPressureKeys, setBloodPressureKeys] = useState([0]);
  const [TemperatureValues, setTemperatureValues] = useState([0]);
  const [TemperatureKeys, setTemperatureKeys] = useState([0]);
  const [isLoading, setIsLoading] = useState(true);

  var keys = [0],
    values = [0];

  let TodayDate = '2022-10-18';

  let dbHeartRate =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    selectedDate +
    '/HeartRate';
  let dbBP =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    selectedDate +
    '/BloodPressure';
  let dbSpO2 =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    selectedDate +
    '/SpO2';
  let dbTemp =
    '/Doctor/-NDRulOcLUH-IfSv_xS4/AllSensorsData/Date/' +
    selectedDate +
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
    setIsLoading(false);
  };

  const getContent = () => {
    return (
      <ActivityIndicator
        style={{marginTop: '70%'}}
        size="large"
        color="black"
      />
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const allData = () => {
    return (
      <ScrollView>
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
    // {
    //   BloodPressureKeys.length === 0 && BloodPressureValues.length === 0 ? (
    //     <Text style={styles.text}>No Available Data For BloodPressure</Text>
    //   ) : (
    //     <ScrollView horizontal={true}>
    //       <GraphicalDetails
    //         values={BloodPressureValues}
    //         keys={BloodPressureKeys}
    //         name="Blood Pressure"
    //       />
    //     </ScrollView>
    //   );
    // }
    // {
    //   TemperatureKeys.length === 0 && TemperatureValues.length === 0 ? (
    //     <Text style={styles.text}>No Available Data For Temperature</Text>
    //   ) : (
    //     <ScrollView horizontal={true}>
    //       <GraphicalDetails
    //         values={TemperatureValues}
    //         keys={TemperatureKeys}
    //         name="Temperature"
    //       />
    //     </ScrollView>
    //   );
    // }
  };

  return (
    <ScrollView style={{marginTop: 50}}>
      {isLoading ? getContent() : allData()}
    </ScrollView>
  );
}
const GraphicalDetails = props => {
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
    marginTop: 50,
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
