import { useState, useEffect, useRef, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	ScrollView, 
	SafeAreaView,
	Clipboard,
	Alert
} from 'react-native';

import { TokenContext } from '../hooks/useAccount.js';
import { makeRequest } from '../tools/requester'

import Ionicons from '@expo/vector-icons/Ionicons';
import LoadingAnimation from '../assets/loading.mp4'

import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';
import { useDatastore } from '../hooks/useDatastore.js';

function ScanScreen({ navigation }) {
	const { token } = useContext(TokenContext);

	const [ hasPermission, setHasPermission ] = useState(null);
	const [ type, setType ] = useState(CameraType.back);
	const camera = useRef(undefined);

	const [ requestStatus, setRequestStatus ] = useState('uninitialized');
	const [ displayText, setDisplayText ] = useState('');

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const [ previewVisible, setPreviewVisible ] = useState(false);
	const [ capturedImage, setCapturedImage ] = useState(undefined);

	async function takePicture() {
		const photo = await camera.current.takePictureAsync();
		setPreviewVisible(true);
		setCapturedImage(photo);
		makeRequest(photo, token, setRequestStatus, setDisplayText);
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	if (previewVisible && capturedImage) {
		return (
			<CameraPreview photo={capturedImage} displayText={displayText} requestStatus={requestStatus} setPreviewVisible={setPreviewVisible} setDisplayText={setDisplayText} navigation={navigation} />
		);
	}
	
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBar}>
				<Ionicons name='menu-outline' size={35} color='white'></Ionicons>
			</TouchableOpacity>
			<Camera
				style={styles.camera}
				type={type}
				ref={(r) => { camera.current = r }}
			>

				<View style={styles.innerWrapper}>

					<TouchableOpacity
						style={styles.button}
						onPress={() => takePicture()}
					>
						<Ionicons style={styles.iconDefault} name='camera' size={46} color='white' />
					</TouchableOpacity>

				</View>

			</Camera>
			<StatusBar style='light' />
		</View>
	);
}

function initializeData(setDisplayText) {
	setDisplayText('')
}

function DisplaySummary({ displayText, setPreviewVisible, setDisplayText } ) {

	const [ copyStatus, setCopyStatus ] = useState(false);
	const [ saveStatus, setSaveStatus ] = useState(false);
	const { addNewItem, removeAllItems, getAllItems } = useDatastore();

	displayText = displayText.substring(1);

	return (
		<View style={styles.innerWrapper}>
			<View style={styles.summaryBackground}>
				<View style={styles.displayTag}>
					<TouchableOpacity
						style={styles.closeSummaryButton}
						onPress={() => {
							setPreviewVisible(false);
							initializeData(setDisplayText);
						}}
					>
						<Ionicons style={styles.iconDefault} name='close' size={40} color='white' />
					</TouchableOpacity>
					<Text style={styles.tldr}>
						TL;DR
					</Text>
				</View>
				<SafeAreaView>
					<ScrollView>
						<Text selectable={true} style={styles.summary}>
							{displayText}
						</Text>
					</ScrollView>
				</SafeAreaView>
				<View style={styles.row}>
					{!copyStatus ? (
						<TouchableOpacity 
							style={styles.copyButton} 
							title="Copy"
							onPress={() => copyToClipBoard(displayText, setCopyStatus)}>
							<Text style={styles.copyText}>
								Copy
							</Text>
							<Ionicons name="clipboard-outline" style={styles.copyIcon} size={20}/>
							</TouchableOpacity>
						) : (
							<Text style={styles.copiedText}>
								Text copied
							</Text>
					)}
					{!saveStatus ? (
						<TouchableOpacity style={styles.saveButton}
							onPress={() => save(displayText, setSaveStatus, addNewItem)}
						>
							<Text style={styles.saveText}>
								Save
							</Text>
							<Ionicons name="save-outline" style={styles.saveIcon} size={20}/>
						</TouchableOpacity>
					) : (
						<Text style={styles.savedText}>
								Text saved
						</Text>
					)}
				</View>
			</View>
		</View>
	)
}

function CameraPreview({ photo, displayText, requestStatus, setPreviewVisible, setDisplayText, navigation }) {
	const { token } = useContext(TokenContext);
	const video = useRef(null);

	return (
	  <View style={styles.container}>
			<ImageBackground
				source={{uri: photo && photo.uri}}
				style={styles.preview}
				blurRadius={75}
			>
					{displayText === '' ? (
						<View style={styles.innerWrapper}>
								{token !== '' ? (
									<>
										<View style={styles.processPopup}>
											<Text style={styles.text}>
												{requestStatus}
											</Text>
											<Video
												ref={video}
												style={styles.animation}
												source={LoadingAnimation}
												shouldPlay={true}
												resizeMode="contain"
												isLooping
											/>
										</View>
										<CancelAndCloseButton text='Cancel' setPreviewVisible={setPreviewVisible} setDisplayText={setDisplayText}/> 
									</>
								) : (
									<>
										<View style={styles.processPopup}>
											<Text style={styles.notSignedInText}>
												{requestStatus}
											</Text>
										</View>
										<CancelAndCloseButton text='Close' setPreviewVisible={setPreviewVisible} setDisplayText={setDisplayText} needLogin={requestStatus === 'You are not signed in'} navigation={navigation} />
									</>
								)}
						</View>
						) : (
							<DisplaySummary displayText={displayText} setPreviewVisible={setPreviewVisible} setDisplayText={setDisplayText} />
						)}
			</ImageBackground>
		<StatusBar style='light' />
	  </View>
	);
}

function CancelAndCloseButton ({ text, setPreviewVisible, setDisplayText, needLogin, navigation }) {

	if (needLogin === true) {
		return (
			<TouchableOpacity
				style={styles.closeButton}
				onPress={() => { 
					setPreviewVisible(false);
					initializeData(setDisplayText);
					navigation.navigate('Sign in');
				}}
			>
				<Ionicons style={[ styles.closeIcon, { left: -15, top: -2 } ]} name='log-in-outline' size={38} color='white' />
				<Text style={styles.closeText}>
					Sign in
				</Text>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity
			style={styles.closeButton}
			onPress={() => { 
				setPreviewVisible(false);
				initializeData(setDisplayText);
			}}
		>
			<Ionicons style={styles.closeIcon} name='close' size={28} color='white' />
			<Text style={styles.closeText}>
				{text}
			</Text>
		</TouchableOpacity>
	);
}

function copyToClipBoard (text, copied) {
	Clipboard.setString(text)
	copied(true);
}

function save(text, setSaveStatus, addNewItem) {
	
	Alert.prompt(
		'Please title this summary',
		undefined,
		[
			{
				text:'Cancel',
				onPress: () => { console.log('Cancel Pressed') },
				style: 'cancel'
			},
			{
				text:'OK',
				onPress: (title) => { 
					console.log(`OK Pressed, title: ${title}`);
					setSaveStatus(true);
					addNewItem({ title: title, time: String(Date.now()), text: text });
					console.log({ title: title, time: String(Date.now()), text: text });
				}
			}
		]
	);
	// const { addNewItem, removeAllItems, getAllItems } = useDatastore();
	// addNewItem({ title: 'title1', time: '1658579054000', text: 'something' })
}

const styles = StyleSheet.create({
	scanning: {
		color: 'white',
		zIndex: 10,
		fontSize: 24,
		alignSelf: 'center',
		position: 'absolute',
		top: 47,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	menuBar: {
		position: 'absolute',
		top: 60,
		left: 30,
		zIndex: 100,
		backgroundColor: '#b251db',
		borderRadius: 29,
		paddingHorizontal: 22,
		paddingVertical: 0,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 10
	},
	container: {
		backgroundColor: '#b251db',
		padding: 15,
		paddingTop: 45,
		zIndex: 2,
		height: '100%',
		width: '100%',
	},
	camera: {
		height: '100%',
		width: '100%',
		borderRadius: 32,
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
	},
	preview: {
		height: '100%',
		width: '100%',
		borderRadius: 32,
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#D39AEC',
	},
	innerWrapper: {
		height: '100%',
		width: '100%',
		padding: 25,
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#b251db',
		alignSelf: 'center',
		position: 'absolute',
		bottom: 25,
		paddingVertical: 15,
		marginHorizontal: 25,
		width: '100%',
		borderRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15
	},
	text: {
		color: 'white',
		alignSelf: 'center',
    	fontSize: 26,
	},
	iconDefault: {
		alignSelf: 'center'
	},
	processPopup: {
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#ab3ed6',
		padding: 25,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	closeButton: {
		backgroundColor: '#ECD5F6',
		alignSelf: 'center',
		width: '100%',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		marginTop: 3,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	},
	animation: {
		marginTop: 8,
		marginBottom: -7,
		alignSelf: 'center',
		height: 100,
		width: 100,
	},
	summaryBackground: {
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 15,
		position: 'absolute',
		bottom: 50,
		zIndex: 3,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	displayTag: {
		backgroundColor: '#b251db',
		width: '100%',
		zIndex: 40,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 10,
		shadowOffset: {
			height: 5
		}
	},
	tldr: {
		color: 'white',
		fontSize: 25,
		alignSelf: 'center',
		fontWeight: 'bold',
		padding: 14,
		paddingBottom: 12
	},
	summary: {
		paddingTop: 25,
		marginLeft: 20,
		marginRight: 20,
		height: 300,
		fontSize: 17,
		color: '#7B7B7B'
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
		marginRight: 5,
		paddingVertical: 15,
		flex: 1,
		borderRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		justifyContent: 'center',
		zIndex: 3,
	},
	copyIcon: {
		color: 'white',
		right: 50
	},
	copyText: {
		fontSize: 17,
		color: 'white',
		left: 15
	},
	saveButton: {
		flexDirection: 'row',
		backgroundColor: '#b251db',
		marginLeft: 5,
		paddingVertical: 15,
		flex: 1,
		borderRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		justifyContent: 'center',
		zIndex: 3,
	},
	saveIcon: {
		color: 'white',
		right: 50,
	},
	saveText: {
		fontSize: 17,
		color: 'white',
		left: 15
	},
	closeSummaryButton: {
		position: 'absolute',
		right: 10,
		top: 7
	},
	closeIcon: {
		color:'#b251db',
		alignSelf: 'center',
		left: -10
	},
	closeText: {
		color:'#b251db',
		fontSize: 26,
		top: -1
	},
	notSignedInText: {
		color: 'white',
		fontSize: 26
	},
	copiedText: {
		position: 'absolute',
		bottom: 35,
		flexDirection: 'row',
		color: '#b251db',
		left: '10%',
		paddingVertical: 15,
		width: '42%',
		zIndex: 3,
		fontSize: 20
	},
	savedText: {
		position: 'absolute',
		bottom: 35,
		flexDirection: 'row',
		color: '#b251db',
		right: '10%',
		paddingVertical: 15,
		width: '42%',
		zIndex: 3,
		fontSize: 20
	}
});

export default ScanScreen;