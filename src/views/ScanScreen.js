import { useState, useEffect, useRef, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	ScrollView, 
	SafeAreaView
} from 'react-native';

import { TokenContext } from '../hooks/useAccount.js';
import { makeRequest } from '../tools/requester'

import Ionicons from '@expo/vector-icons/Ionicons';

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
			<CameraPreview photo={capturedImage} displayText={displayText} requestStatus={requestStatus} />
		);
	}

	const { addNewItem, removeAllItems, getAllItems } = useDatastore();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBar}>
				<Ionicons name='menu-outline' size={40} color='white'></Ionicons>
			</TouchableOpacity>
			<Camera
				style={styles.camera}
				type={type}
				ref={(r) => { camera.current = r }}
				o
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

function DisplaySummary({ displayText }) {

	// const { addNewItem, removeAllItems, getAllItems } = useDatastore();
	// addNewItem({ title: 'title1', time: '1658579054000', text: 'fhdjghjkfdshgjkfdshjgkfdshjgkfdshjkgsdf' })
	displayText = displayText.substring(1);

	return (
		<View style={styles.innerWrapper}>
			<View style={styles.summaryBackground}>
				<View style={styles.displayTag}>
					<TouchableOpacity
								style={styles.closeSummaryButton}
								onPress={() => setPreviewVisible(false)}
							>
						<Ionicons style={styles.iconDefault} name='close' size={40} color='white' />
					</TouchableOpacity> 
					<Text style={styles.tldr}>
						TL;DR
					</Text>
				</View>
				<SafeAreaView>
					<ScrollView>
						<Text style={styles.summary}>
							{displayText}
							console.log(displayText)
						</Text>
					</ScrollView>
				</SafeAreaView>
				<TouchableOpacity style={styles.copyButton} title="Copy">
					<Text style={styles.copyText}>
						Copy
					</Text>
					<Ionicons name="clipboard-outline" style={styles.copyIcon} size={20}/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.saveButton} title="Save">
					<Text style={styles.saveText}>
						Save
					</Text>
					<Ionicons name="save-outline" style={styles.saveIcon} size={20}/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

function CameraPreview({ photo, displayText, requestStatus }) {
	return (
	  <View style={styles.container}>
			<ImageBackground
				source={{uri: photo && photo.uri}}
				style={styles.preview}
				blurRadius={75}
			>
					{displayText === '' ? (
						<View style={styles.innerWrapper}>
							<View style={styles.processPopup}>
								<Text style={styles.text}>
									{requestStatus}
								</Text>
								<Ionicons style={styles.animation} name='information-circle-outline' size={46} color='white' />
							</View>
						</View>
					) : (
						<DisplaySummary displayText={displayText} />
					)}				
			</ImageBackground>
		<StatusBar style='light' />
	  </View>
	);
}

const styles = StyleSheet.create({
	menuBar: {
		position: 'absolute',
		top: 40,
		left: 20,
		zIndex: 100,
	},
	container: {
		backgroundColor: '#b251db',
		padding: 15,
		paddingTop: 45,
		zIndex: 2,
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
	},
	innerWrapper: {
		height: '100%',
		width: '100%',
		padding: 25
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
    	fontSize: 30,
		top: 25,
	},
	iconDefault: {
		alignSelf: 'center'
	},
	processPopup: {
		width: '100%',
		height: 200,
		alignSelf: 'center',
		backgroundColor: '#b251db',
		borderRadius: 15,
		top: 150,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	animation: {
		alignSelf: 'center',
		position: 'absolute',
		top: 100
	},
	summaryBackground: {
		backgroundColor: 'white',
		alignSelf: 'center',
		height: '80%',
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
		position: 'absolute',
		height: '15%',
		width: '100%',
		zIndex: 40,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	tldr: {
		color: 'white',
		fontSize: 30,
		alignSelf: 'center',
		top: 20,
		fontWeight: 'bold',
		position: 'absolute'
	},
	summary: {
		marginLeft: 20,
		marginRight: 20,
		top: '17%',
		height: '100%',
		fontSize: 17,
	},
	copyButton: {
		position: 'absolute',
		bottom: 35,
		flexDirection: 'row',
		backgroundColor: '#b251db',
		left: '5%',
		paddingVertical: 15,
		width: '42%',
		borderRadius: 15,
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
		position: 'absolute',
		bottom: 35,
		flexDirection: 'row',
		backgroundColor: '#b251db',
		right: '5%',
		paddingVertical: 15,
		width: '42%',
		borderRadius: 15,
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
		left: '83%',
		top: '10%'
	}
	});

export default ScanScreen;