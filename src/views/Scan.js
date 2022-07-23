import { useState, useEffect, useRef } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { makeRequest } from '../tools/requester'

import Ionicons from '@expo/vector-icons/Ionicons';

import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from 'expo-camera';

function ScanScreen() {
	const [ hasPermission, setHasPermission ] = useState(null);
	const [ type, setType ] = useState(CameraType.back);
	const camera = useRef(undefined);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const [ previewVisible, setPreviewVisible ] = useState(false);
	const [ capturedImage, setCapturedImage ] = useState(undefined);

	async function takePicture() {
		const photo = await camera.current.takePictureAsync({ base64: true });
		setPreviewVisible(true);
		setCapturedImage(photo);
		makeRequest(photo);
	}

	function CameraPreview({ photo }) {
		return (
		  <View style={styles.container}>
			<ImageBackground
				source={{uri: photo && photo.uri}}
				style={styles.preview}
			>
				<View style={styles.innerWrapper}>

					<TouchableOpacity
						style={styles.button}
						onPress={() => setPreviewVisible(false)}
					>
						<Ionicons style={styles.icon} name='close' size={46} color='white' />
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
			>

				<View style={styles.innerWrapper}>

					<TouchableOpacity
						style={styles.button}
						onPress={() => takePicture()}
					>
						<Ionicons style={styles.icon} name='camera' size={46} color='white' />
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
		// height: '100%'
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
	},
	icon: {
		alignSelf: 'center'
	}
});

export default ScanScreen;