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

const Home = ({navigation}) => {
  const colorScheme = Appearance.getColorScheme();
  const [statK, setStatK] = useState('');
  const [statD, setStatD] = useState('');
  const [statR, setStatR] = useState('');
  useEffect(() => {
    let ignore = false;
    // console.warn('inside home', navigation.navigate('Flashcard'));
    if (!ignore) getData();
    return () => {
      ignore = true;
    };
  });
  const getData = async () => {
    let know = await AsyncStorage.getItem('knowKey');
    setStatK(know);
    know = await AsyncStorage.getItem('dKnowKey');
    setStatD(know);
    know = await AsyncStorage.getItem('resKey');
    setStatR(know);
  };
  const setData = async () => {
    await AsyncStorage.setItem('knowKey', '0');
    await AsyncStorage.setItem('dKnowKey', '0');
    await AsyncStorage.setItem('resKey', '0');
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
              padding: 40,
              //   alignItems: 'center',
              justifyContent: 'center',
              width: 350,
              height: 200,
            }}>
            <Text style={[styles.report, {color: 'green'}]}>
              {statK}
              <Text style={styles.report}> I know</Text>
            </Text>
            <Text style={[styles.report, {color: 'red'}]}>
              {statD}
              <Text style={styles.report}> I don't know</Text>
            </Text>
            <Text style={[styles.report, {color: 'orange'}]}>
              {statR}
              <Text style={styles.report}> Need Research</Text>
            </Text>
          </View>
          {/* <Button title="Reveal" onPress={getData} /> */}
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
                  setData();
                  navigation.navigate('Flashcard', {
                    setStatK,
                    setStatD,
                    setStatR,
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
// const fontColor = colorScheme === 'dark' ? 'black' : '#F7F5F2';
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
    // backgroundColor: 'black',
  },
  dark: {
    color: 'white',
  },
  light: {
    color: 'black',
  },
});

export default Home;
