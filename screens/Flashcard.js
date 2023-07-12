/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  Appearance,
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorScheme = Appearance.getColorScheme();
const color = colorScheme === 'dark' ? '#F7F5F2' : 'black';
const fontColor = colorScheme === 'dark' ? 'black' : '#F7F5F2';
const Flashcard = ({route, navigation}) => {
  const {setStatK, setStatD, setStatR} = route.params;
  var k = '';
  const [card, setCard] = useState('0');
  const setData = async (key, val) => {
    await AsyncStorage.setItem(key, val);
  };
  const incData = async key => {
    let value = await AsyncStorage.getItem(key);
    if (value === null) {
      setData(key, '0');
    }
    k = await AsyncStorage.getItem(key);
    k = (parseInt(k) + 1).toString();
    setData(key, k.toString());
    setStatK(await AsyncStorage.getItem('knowKey'));
    setStatD(await AsyncStorage.getItem('dKnowKey'));
    setStatR(await AsyncStorage.getItem('resKey'));
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: '#EC625F',
              width: 150,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Button
              title="Next Card >"
              color="white"
              onPress={() => {
                if (parseInt(card) < 9) {
                  setCard((parseInt(card) + 1).toString());
                } else {
                  setCard('0');
                }
              }}
            />
          </View>

          <View
            style={{
              margin: 30,
              borderRadius: 25,
              backgroundColor: color,
              width: 350,
              height: 500,
            }}>
            <View style={{padding: 30}}>
              <Text style={{fontWeight: 'bold', color: fontColor}}>
                Question {parseInt(card) + 1}:
              </Text>
              <Text style={{color: fontColor}}>
                {qa.map(q => q.question)[parseInt(card)]}
              </Text>
            </View>
            <View style={{paddingHorizontal: 30}}>
              <Text style={{fontWeight: 'bold', color: fontColor}}>
                Answer:
              </Text>
              <Text style={{color: fontColor}}>
                {qa.map(q => q.answer)[parseInt(card)]}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'green',
                width: 100,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Button
                title="I know"
                color={'white'}
                onPress={() => {
                  incData('knowKey');
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'red',
                width: 120,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                margin: 10,
              }}>
              <Button
                title="I don't know"
                color={'white'}
                onPress={() => incData('dKnowKey')}
              />
            </View>
            <View
              style={{
                backgroundColor: 'orange',
                width: 140,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // margin: 5,
              }}>
              <Button
                title="Need Research"
                color={'white'}
                onPress={() => incData('resKey')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
const qa = [
  {
    question: 'What are Props in React Component?',
    answer:
      'Props are parameters which are used to customize a component at the time of creation and on re-render. Props are like argument passed to a React component',
  },
  {
    question: 'What are States in React Component?',
    answer:
      "State is like a component's personal data storage. State is useful for handling data that changes over time or that comes from user interaction. State gives your components memory!",
  },
  {
    question: 'What is Modal in React Component?',
    answer:
      'A modal is a message box that is displayed on top of your screen. Modals put an overlay on the screen; therefore, they take visual precedence over all the other elements.',
  },
  {
    question: 'What are Pressable in React Component?',
    answer:
      'Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.',
  },
  {
    question: 'What are RefreshControl in React Component?',
    answer:
      'This component is used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at scrollY: 0, swiping down triggers an onRefresh event.',
  },
  {
    question: 'What is ScrollView in React Component?',
    answer:
      'Component that wraps platform ScrollView while providing integration with touch locking "responder" system.',
  },
  {
    question: 'What are StatusBar in React Component?',
    answer:
      "Component to control the app's status bar. The status bar is the zone, typically at the top of the screen, that displays the current time, Wi-Fi and cellular network information, battery level and/or other status icons.",
  },
  {
    question: 'What are Switch in React Component?',
    answer:
      'Renders a boolean input. This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.',
  },
  {
    question: 'What is TextInput in React Component?',
    answer:
      'A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.',
  },
  {
    question: 'What is TouchableHighlight in React Component?',
    answer:
      'A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.',
  },
];

export default Flashcard;
