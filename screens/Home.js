/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Appearance,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, route}) => {
  // for controlling dark/light mode color schemes
  const colorScheme = Appearance.getColorScheme();

  // for fetching and updating the report view
  const [stateK, setStateK] = useState(''); // know state
  const [stateD, setStateD] = useState(''); // don't know state
  const [stateR, setStateR] = useState(''); // research state
  // const [stateC, setStateC] = useState(''); // count state
  // const [countFlag, setCountFlag] = useState(false);
  // console.warn(countFlag);

  var transferCount = '0';

  // if (route.params === undefined) {
  //   console.warn('inside undefined');
  // } else {
  //   const {count} = route.params;
  // }

  // if (countFlag) {
  //   console.warn(countFlag);
  //   const {count} = route.params;
  // }

  // fetching data everytime the screen loads
  useEffect(() => {
    let ignore = false;
    if (!ignore) getData();
    return () => {
      ignore = true;
    };
  });

  // fetching data from Async Storage and putting in state variables
  const getData = async () => {
    let val = await AsyncStorage.getItem('know');
    setStateK(val);
    val = await AsyncStorage.getItem('dontKnow');
    setStateD(val);
    val = await AsyncStorage.getItem('research');
    setStateR(val);
    val = await AsyncStorage.getItem('count');
    transferCount = val;
    // setStateC(count);
  };

  // When called, reset all data to '0'
  const resetData = async () => {
    await AsyncStorage.setItem('know', '0');
    await AsyncStorage.setItem('dontKnow', '0');
    await AsyncStorage.setItem('research', '0');
    await AsyncStorage.setItem('count', '0');
    getData();
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{}}>
          <View
            style={{
              margin: 100,
              borderRadius: 25,
              backgroundColor: '#525252',
              padding: 30,
              justifyContent: 'center',
              width: 350,
              height: 200,
            }}>
            <Text style={[styles.report, {color: 'green'}]}>
              {stateK}
              <Text style={styles.report}> 👍 I know </Text>
            </Text>
            <Text style={[styles.report, {color: 'red'}]}>
              {stateD}
              <Text style={styles.report}> 👎 I don't know</Text>
            </Text>
            <Text style={[styles.report, {color: 'orange'}]}>
              {stateR}
              <Text style={styles.report}> 📚 Need Research</Text>
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: '#EC625F',
                width: 120,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Button
                title="Reset Score"
                color="white"
                onPress={() => {
                  resetData();
                }}
              />
            </View>
          </View>
          <View
            style={{
              margin: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#068FFF',
                width: 180,
                height: 180,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 200,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // resetData();
                  // console.warn(countFlag);
                  // if (countFlag) {
                  //   transferCount = count;
                  //   console.warn(transferCount);
                  // }
                  // setCountFlag(true);
                  if (route.params === undefined) {
                    console.warn('undefined');
                  } else {
                    const {count} = route.params;
                    transferCount = count;
                  }
                  navigation.navigate('Flashcard', {
                    setStateK,
                    setStateD,
                    setStateR,
                    transferCount,
                  });
                }}>
                <Text
                  style={[
                    colorScheme === 'dark' ? styles.light : styles.dark,
                    {fontSize: 50},
                  ]}>
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// for stylizing components
const styles = StyleSheet.create({
  report: {
    color: '#EBEBE3',
    fontSize: 30,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dark: {
    color: 'white',
  },
  light: {
    color: 'black',
  },
});

export default Home;
