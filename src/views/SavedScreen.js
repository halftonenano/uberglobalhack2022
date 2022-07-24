import { useEffect, useRef, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Clipboard from 'expo-clipboard';
import { useDatastore } from '../hooks/useDatastore';

export default function SavedScreen({ navigation }) {

	const { addNewItem, removeAllItems, getAllItems, deleteItemAtIndex } = useDatastore();

	const [ savedData, setSavedData ] = useState();
	const dataInit = useRef();
	const [ openCardTitle, setOpenCardTitle ] = useState('');

	useEffect(() => {
		if (dataInit.current === undefined) {

			getAllItems().then((data) => setSavedData(data));

			dataInit.current = 'data pulled';
		}
	});

	return (
		<View style={styles.background}>
			<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBar}>
				<Ionicons name='menu-outline' size={35} color='white' />
			</TouchableOpacity>
			<Text style={styles.heading}>Saved</Text>
			<TouchableOpacity onPress={() => getAllItems().then((data) => setSavedData(data))} style={styles.refresh}>
				<Ionicons name='refresh-outline' size={30} color='white' />
			</TouchableOpacity>
			{savedData !== undefined && (
				<View>
					<SafeAreaView style={styles.white}>
						<ScrollView style={styles.scrollview}>
							{savedData.array.length < 1 ? (
								<Text style={styles.warningText}>You have no{'\n'}summaries saved</Text>
							) : (
								<>
									{savedData.array.map((item, index) => {
										let timeStamp = dateFromMilsec(parseInt(item.time));
										if (item.title === openCardTitle) {
											return (
												<View style={styles.cardOpen} key={index}>
													<View style={styles.topOpen}>
														<Text style={[ styles.text, styles.cardTitleOpen ]}>{item.title}</Text>
													</View>
													<View style={styles.passage}>
														<Text style={styles.size}>{item.text}</Text>
													</View>
													<ActionButtons displayText={item.text} index={index} deleteItemAtIndex={deleteItemAtIndex} setSavedData={setSavedData} setOpenCardTitle={setOpenCardTitle} />
												</View>
											);
										}
										return (
											<TouchableOpacity key={index}
												onPress={() => setOpenCardTitle(item.title)}
											>
												<View style={styles.card}>
													<View style={styles.top}>
														<Text numberOfLines={1} style={[ styles.text, styles.cardTitle ]}>{item.title}</Text>
														<Text style={styles.text}>{timeStamp}</Text>
													</View>
													<View style={styles.passage}>
														<Text numberOfLines={4} style={styles.size}>{item.text}</Text>
													</View>
												</View>
											</TouchableOpacity>
										);
									})}
								</>
							)}
						</ScrollView>
					</SafeAreaView>
				</View>
			)}
		</View>
	);
}

function ActionButtons({ displayText, index, deleteItemAtIndex, setSavedData, setOpenCardTitle }) {
	const [ copyStatus, setCopyStatus ] = useState(false);

	return (
		<View style={styles.row}>
			<TouchableOpacity 
				style={styles.copyButton}
				title="Copy"
				onPress={() => copyToClipBoard(displayText, setCopyStatus)}
			>
				{!copyStatus ? (
					<>
						<Ionicons name="clipboard-outline" style={styles.actionIcon} size={24}/>
						<Text style={styles.actionText}>
							Copy
						</Text>
					</>
				) : (
					<Text style={styles.actionDoneText}>
						Text copied!
					</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity style={styles.saveButton}
				onPress={() => deleteItemAtIndex(index).then((newData) => {
					setSavedData(newData);
					setOpenCardTitle('');
				})}
			>
				<Text style={styles.actionText}>
					Delete
				</Text>
				<Ionicons name="trash-outline" style={styles.actionIcon} size={24}/>
			</TouchableOpacity>
		</View>
	);
}
function copyToClipBoard(text, setCopyStatus) {
	Clipboard.setStringAsync(text);
	setCopyStatus(true);
}

function dateFromMilsec(time) {
	var dt = new Date(time);
	var datee = `${(dt.getMonth() + 1)} / ${dt.getDate()}  |  ${dt.getHours()}:${String(dt.getMinutes()).length === 1 ? `0${dt.getMinutes()}` : dt.getMinutes()}`
	return (datee);
}

const styles = StyleSheet.create({
	warningText: {
		color: '#b251db',
		fontSize: 26,
		width: '80%',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 50
	},
	card: {
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
	cardOpen: {
		width: '100%',
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
	topOpen: {
		backgroundColor: '#b251db',
		borderTopLeftRadius: 14,
		borderTopEndRadius: 14,
		padding: 10,
		paddingHorizontal: 20,
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
		fontWeight: 'bold',
		width: '55%'
	},
	cardTitleOpen: {
		fontWeight: 'bold',
		// width: '55%'
		color: 'white'
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
	refresh: {
		position: 'absolute',
		top: 44,
		right: 20,
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
	},
	row: {
		flexDirection: 'row',
		padding: 15,
		borderTopColor: '#cccccc',
		borderTopWidth: 1
	},
	copyButton: {
		flexDirection: 'row',
		backgroundColor: '#b251db',
		marginRight: 7,
		paddingVertical: 15,
		flex: 1,
		borderRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		justifyContent: 'center',
		zIndex: 3,
	},
	saveButton: {
		flexDirection: 'row',
		backgroundColor: '#b251db',
		marginLeft: 7,
		paddingVertical: 15,
		flex: 1,
		borderRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		justifyContent: 'center',
		zIndex: 3,
	},
	actionIcon: {
		color: 'white',
		position: 'absolute',
		left: 12,
		top: 12
	},
	actionText: {
		fontSize: 17,
		color: 'white',
		left: 5
	},
	actionDoneText: {
		fontSize: 17,
		color: 'white',
	},
});