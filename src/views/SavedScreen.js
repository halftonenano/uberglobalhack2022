import { useEffect, useRef, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useDatastore } from '../hooks/useDatastore';

export default function SavedScreen({ navigation }) {

	const { addNewItem, removeAllItems, getAllItems } = useDatastore();

	const [ savedData, setSavedData ] = useState();
	const dataInit = useRef();

	useEffect(() => {
		if (dataInit.current === undefined) {

			getAllItems().then((data) => setSavedData(data));

			dataInit.current = 'data pulled';
		}

	});

	return (
		
		<View style={styles.background}>
			<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBar}>
				<Ionicons name='menu-outline' size={35} color='white'></Ionicons>
			</TouchableOpacity>
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
						<ScrollView style={styles.scrollview}>
							{savedData.array.map((item, index) => {
								let timeStamp = dateFromMilsec(parseInt(item.time));
								
								return (
									<TouchableOpacity key={index}>
										<View style={styles.card}>
											<View style={styles.top}>
												<Text style={[ styles.text, styles.cardTitle ]}>{item.title}</Text>
												<Text style={styles.text}>{timeStamp}</Text>
											</View>
											<View style={styles.passage}>
												<Text numberOfLines={4} style={styles.size}>{item.text}</Text>
											</View>
										</View>
									</TouchableOpacity>
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

	var datee = `${(dt.getMonth() + 1)} / ${dt.getDate()}    ${dt.getHours()}:${String(dt.getMinutes()).length === 1 ? `0${dt.getMinutes()}` : dt.getMinutes()}`

	return (datee);
}

const styles = StyleSheet.create({
	card: {
		// width: '90%',
		width: '100%',
		height: 155,
		alignSelf: 'center',
		marginTop: 18,
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
	scrollview: {
		paddingHorizontal: 18,
		paddingBottom: 50
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
		backgroundColor: '#b251db',
		zIndex: 1,
		paddingTop: 53
	},
	heading: {
		fontSize: 24,
		color: 'white',
		position: 'absolute',
		top: 47,
		justifyContent: 'center',
		alignSelf: 'center',
		zIndex: 2,
	},
	menuBar: {
		position: 'absolute',
		top: 43,
		left: 20,
		zIndex: 10,
	},
	white: {
		bottom: -35,
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		zIndex: 2,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		overflow: 'hidden',
		// paddingBottom: 30
	}
});