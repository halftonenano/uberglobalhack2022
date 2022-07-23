import AsyncStorage from '@react-native-async-storage/async-storage';
import Summary from './Scan.js';

const storeData = async (value) => {
	try {
	  await AsyncStorage.setItem('@storage_Key', value)
	} catch (e) {
	  // saving error
	}
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
