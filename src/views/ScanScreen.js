import { useState, useEffect, useRef, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

import { TokenContext } from '../hooks/useAccount.js';
import { makeRequest } from '../tools/requester'

import Ionicons from '@expo/vector-icons/Ionicons';

import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';

function ScanScreen() {
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

	function CameraPreview({ photo }) {
		return (
		  <View style={styles.container}>
				<ImageBackground
					source={{uri: photo && photo.uri}}
					style={styles.preview}
					blurRadius={75}
				>
					<View style={styles.innerWrapper}>
						<View style={styles.processPopup}>
							<Text style={styles.text}>
								{requestStatus}
							</Text>
							<Ionicons style={styles.sendIcon} name='send-outline' size={46} color='white' />
							<Ionicons style={styles.timeIcon} name='time' size={23} color='white' />
							<Ionicons style={styles.hardwareIcon} name='hardware-chip-outline' size={58} color='white' />
							<Ionicons style={styles.gridIcon} name='grid-outline' size={20} color='white' />
						</View>
						<TouchableOpacity
							style={styles.button}
							onPress={() => setPreviewVisible(false)}
						>
							<Ionicons style={styles.iconDefault} name='close' size={46} color='white' />
						</TouchableOpacity>
					
					</View>
				</ImageBackground>
			<StatusBar style='light' />
		  </View>
		);
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	if (previewVisible && capturedImage) {
		return (
			<CameraPreview photo={capturedImage} />
		);
	}

	return (
		<View style={styles.container}>
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

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#b251db',
		padding: 15,
		paddingTop: 45,
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
		top: 150
	},
	sendIcon: {
		left: 80,
		top: 60,
	},
	timeIcon: {
		top: 31,
		left: 108,
	},
	hardwareIcon: {
		left: 168,
		bottom: 20,
	},
	gridIcon: {
		left: 185,
		bottom: 62,
	}
});

export default ScanScreen;