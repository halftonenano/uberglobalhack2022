import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';

export default function SavedScreen() {

	const [ savedData, setSavedData ] = useState();
	const dataInit = useRef();

	useEffect(() => {
		if (dataInit.current === undefined) {

			const exampleData = {
				array: [
					{ title: 'title1', time: '1658579054000', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
					{ title: 'title2', time: '1658579054000', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
					{ title: 'title3', time: '1658579054000', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
					{ title: 'title4', time: '1658579054000', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
				]
			}

			setSavedData(exampleData);

			// getData().then((data) => setSavedData(JSON.parse(data)));

			dataInit.current = 'data pulled';
		}
	});

	return (
		<View style={styles.background}>
			<Text style={styles.heading}> Saved </Text>
			{/* <TouchableOpacity
				style={styles.button}
				onPress={() => storeData(JSON.stringify(exampleData))}
			>
				<Ionicons name={'save-outline'} size={34} color={'#b251db'} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => getData()}
			>
				<Ionicons name={'bookmark-outline'} size={34} color={'#b251db'} />
			</TouchableOpacity> */}
			{savedData !== undefined && (
				<View>
					<View style={styles.white}>
						{savedData.array.map((item, index) => {
							let timeStamp = dateFromMilsec(parseInt(item.time));
							
							return (
								<View key={index} style={styles.card}>
									<View style={styles.top}>
										<Text style={styles.text}>{item.title}</Text>
										<Text style={styles.text}>{timeStamp}</Text>
									</View>
									<View style={styles.passage}>
										<Text>{item.text}</Text>
									</View>
								</View>
							);
						})}
					</View>
				</View>
			)}
		</View>
	);
}

function dateFromMilsec(time) {
	var dt = new Date(time);
	var datee = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

	console.log(datee);

	return (datee);
}

async function storeData(value) {
	try {
		await AsyncStorage.setItem('@saved_summaries', value)
	} catch (e) {
		// saving error
		console.log('error saving');
	}
}

async function getData() {
	try {
		const value = await AsyncStorage.getItem('@saved_summaries')
		if (value !== null) {
			return value;
		}
	} catch(e) {
		// error reading value
	}
}

const styles = StyleSheet.create({
	card: {
		width:'90%',
		height: '30%',
		borderColor: '#b251db',
		borderWidth: 3,
		alignSelf: 'center',
		marginVertical: 15,
		borderRadius: 15,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	top: {
		backgroundColor: '#ECD5F6',
		borderTopLeftRadius: 12,
		borderTopEndRadius: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	text: {
		fontSize: 20,
	},
	left: {

	},
	right: {

	},
	passage: {
		padding: 10,
	},
	background: {
		height: '100%',
		width: '100%',
		backgroundColor: '#b251db',
		zIndex: 1,
		paddingTop: 90
	},
	heading: {
		fontSize: 24,
		color: '#FFFFFF',
		position: 'absolute',
		top: 45,
		justifyContent: 'center',
		alignSelf: 'center',
		zIndex: 2,
	},
	white: {
		backgroundColor: '#FFFFFF',
		height: '100%',
		width: '100%',
		zIndex: 2,
		borderRadius: 15,
	}
});