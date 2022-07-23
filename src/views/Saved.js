import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';

export default function SavedScreen() {

	const [ savedData, setSavedData ] = useState();
	const dataInit = useRef();

	useEffect(() => {
		if (dataInit.current === undefined) {

			let sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec ultrices tincidunt arcu non sodales. Morbi tincidunt ornare massa eget. Pretium lectus quam id leo in vitae turpis massa. Faucibus a pellentesque sit amet porttitor. Cras fermentum odio eu feugiat pretium nibh. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Bibendum at varius vel pharetra vel turpis. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Egestas sed sed risus pretium quam. Elit ut aliquam purus sit amet luctus venenatis lectus. Quis blandit turpis cursus in hac. Dui nunc mattis enim ut tellus.'

			const exampleData = {
				array: [
					{ title: 'title1', time: '1658579054000', text: sampleText },
					{ title: 'title2', time: '1658579054000', text: sampleText },
					{ title: 'title3', time: '1658579054000', text: sampleText },
					{ title: 'title4', time: '1658579054000', text: sampleText },
					{ title: 'title1', time: '1658579054000', text: sampleText },
					{ title: 'title2', time: '1658579054000', text: sampleText },
					{ title: 'title3', time: '1658579054000', text: sampleText },
					{ title: 'title4', time: '1658579054000', text: sampleText },
				]
			}

			setSavedData(exampleData);

			// getData().then((data) => setSavedData(JSON.parse(data)));

			dataInit.current = 'data pulled';
		}
	});

	return (
		<View style={styles.background}>
			<Text style={styles.heading}>Saved</Text>
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
					<SafeAreaView style={styles.white}>
						<ScrollView>
							{savedData.array.map((item, index) => {
								let timeStamp = dateFromMilsec(parseInt(item.time));
								
								return (
									<View key={index} style={styles.card}>
										<View style={styles.top}>
											<Text style={[ styles.text, styles.cardTitle ]}>{item.title}</Text>
											<Text style={styles.text}>{timeStamp}</Text>
										</View>
										<View style={styles.passage}>
											<Text numberOfLines={4} style={styles.size}>{item.text}</Text>
										</View>
									</View>
								);
							})}
						</ScrollView>
					</SafeAreaView>
				</View>
			)}
		</View>
	);
}

function dateFromMilsec(time) {
	var dt = new Date(time);
	var datee = dt.getFullYear() + " / " + (dt.getMonth() + 1) + " / " + dt.getDate();

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
		height: 155,
		// borderColor: '#b251db',
		// borderWidth: 2,
		alignSelf: 'center',
		marginVertical: 15,
		borderRadius: 15,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOpacity: 0.15,
		shadowRadius: 12,
	},
	top: {
		backgroundColor: '#ECD5F6',
		borderTopLeftRadius: 14,
		borderTopEndRadius: 14,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		paddingHorizontal: 20,
		// borderBottomColor: '#b251db',
		// borderBottomWidth: 2,
		zIndex: 3,
	},
	text: {
		fontSize: 20,
		color: '#b251db'
	},
	cardTitle: {
		fontWeight: 'bold'
	},
	size: {
		fontSize: 15,
		color: '#7B7B7B'
		// width: '100%'
	},
	passage: {
		padding: 20,
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
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderTopColor: 'white',
		borderTopWidth: 5,
	}
});