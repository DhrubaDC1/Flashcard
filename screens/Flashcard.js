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
import {count} from 'console';

// for controlling dark/light mode color schemes
const colorScheme = Appearance.getColorScheme();
function color(count) {
  if (arrKnow.includes(count)) {
    return 'green';
  } else if (arrDontKnow.includes(count)) {
    return 'red';
  } else if (arrResearch.includes(count)) {
    return 'orange';
  } else {
    return colorScheme === 'dark' ? '#F7F5F2' : '#525252';
  }
}
const fontColor = colorScheme === 'dark' ? 'black' : '#F7F5F2';

// arrays for keeping track of tags
const arrKnow = [];
const arrDontKnow = [];
const arrResearch = [];

const Flashcard = ({navigation, route}) => {
  // getting parameters passed by Home.js navigate function
  const {setStateK, setStateD, setStateR, transferCount} = route.params;

  var temp = '';

  // for index of question and answer
  const [count, setCount] = useState(transferCount);

  // For writing to Async Storage
  const setData = async (key, val) => {
    await AsyncStorage.setItem(key, val);
  };

  // For initializing value if not available
  const initValue = async key => {
    let value = await AsyncStorage.getItem(key);
    if (value === null) {
      setData(key, '0');
    }
  };

  // For incrementing the existing value by 1
  const incrementData = async key => {
    initValue(key);
    temp = await AsyncStorage.getItem(key);
    temp = (parseInt(temp) + 1).toString();
    setData(key, temp.toString());

    // send the current progress to home screen
    setStateK(await AsyncStorage.getItem('know'));
    setStateD(await AsyncStorage.getItem('dontKnow'));
    setStateR(await AsyncStorage.getItem('research'));
  };

  // for decreasing the existing value by 1
  const decreaseData = async key => {
    // initValue(key);
    temp = await AsyncStorage.getItem(key);
    temp = (parseInt(temp) - 1).toString();
    setData(key, temp.toString());

    // send the current progress to home screen
    setStateK(await AsyncStorage.getItem('know'));
    setStateD(await AsyncStorage.getItem('dontKnow'));
    setStateR(await AsyncStorage.getItem('research'));
  };

  // For getting the next question
  const nextQues = () => {
    if (parseInt(count) < 9) {
      setCount((parseInt(count) + 1).toString());
    } else {
      setCount('0');
    }
  };

  //remove all instances of a value from array
  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: '#068FFF',
              width: 150,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              borderRadius: 10,
            }}>
            <Button
              title="Home"
              color="white"
              onPress={() => {
                navigation.navigate('Home', {
                  count,
                });
              }}
            />
          </View>
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
                nextQues();
              }}
            />
          </View>
          <View
            style={{
              margin: 30,
              borderRadius: 25,
              backgroundColor: color(count),
              width: 350,
              height: 500,
            }}>
            <View style={{padding: 30}}>
              <Text style={{fontWeight: 'bold', color: fontColor}}>
                Question {parseInt(count) + 1}:
              </Text>
              <Text style={{color: fontColor}}>
                {qa.map(q => q.question)[parseInt(count)]}
              </Text>
            </View>
            <View style={{paddingHorizontal: 30}}>
              <Text style={{fontWeight: 'bold', color: fontColor}}>
                Answer:
              </Text>
              <Text style={{color: fontColor}}>
                {qa.map(q => q.answer)[parseInt(count)]}
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
                backgroundColor: arrKnow.includes(count) ? 'grey' : 'green',
                width: 110,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Button
                title="👍 I know"
                color="white"
                onPress={() => {
                  arrKnow.push(count);
                  if (arrDontKnow.includes(count)) {
                    // console.warn('dont know');
                    decreaseData('dontKnow');
                  } else if (arrResearch.includes(count)) {
                    // console.warn('research');
                    decreaseData('research');
                  }
                  removeItemAll(arrDontKnow, count);
                  removeItemAll(arrResearch, count);

                  incrementData('know');
                  nextQues();
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: arrDontKnow.includes(count) ? 'grey' : 'red',
                width: 140,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                margin: 10,
              }}>
              <Button
                title="👎 Don't know"
                color={'white'}
                onPress={() => {
                  arrDontKnow.push(count);
                  if (arrKnow.includes(count)) {
                    // console.warn('know');
                    decreaseData('know');
                  } else if (arrResearch.includes(count)) {
                    // console.warn('research');
                    decreaseData('research');
                  }
                  removeItemAll(arrKnow, count);
                  removeItemAll(arrResearch, count);
                  incrementData('dontKnow');
                  nextQues();
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: arrResearch.includes(count)
                  ? 'grey'
                  : 'orange',
                width: 100,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Button
                title="Need 📚 Research"
                color={'white'}
                onPress={() => {
                  arrResearch.push(count);
                  if (arrKnow.includes(count)) {
                    // console.warn('know');
                    decreaseData('know');
                  } else if (arrDontKnow.includes(count)) {
                    // console.warn('dontKnow');
                    decreaseData('dontKnow');
                  }
                  removeItemAll(arrDontKnow, count);
                  removeItemAll(arrKnow, count);
                  incrementData('research');
                  nextQues();
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// for stylizing components
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

// Array of objects for questions and answers
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
