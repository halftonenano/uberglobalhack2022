import {
	 View, 
	 Text, 
	 StyleSheet,
	 Image,
	 TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScanScreen from './Scan';

function HomeScreen(props) {
	return (
		<View style={styles.background}>
			<Image style={styles.image} source={require('./Group5.png')} />
			<View style={styles.whiteBackground}>
				<View style={styles.row}>
					<Ionicons name="arrow-back" style={styles.arrow} size={50}/>
					<Text style={styles.text}>
						swipe right to access menu
					</Text>
				</View>
				<TouchableOpacity 
					style={styles.button}
				>
					<Ionicons name='camera-outline' style={styles.camera} size={50}/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
	background: {
		backgroundColor: '#b251db',
		height: '100%',
		width: '100%',
	},
	image: {
		width: 175,
		height: 250,
		left: 10,
		top: 60,
		position: 'absolute',
	},
	whiteBackground: {
		position: 'absolute',
		bottom: -15,
		height: '40%',
		width: '100%',
		backgroundColor: '#FFFFFF',
		zIndex: 2,
		borderRadius: 25,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 25,
	},
	text: {
		color: '#b251db',
		fontWeight: 'bold',
		fontSize: 25,
		width: 200,
		top: 20,
		left: 25
	},
	arrow: {
		color: '#b251db',
		left: 15,
		top: 10
	},
	button: {
		backgroundColor: '#b251db',
		alignSelf: 'center',
		paddingVertical: 10,
		width: '90%',
		borderRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		position: 'absolute',
		zIndex: 4,
		bottom: 30
	},
	camera: {
		color: 'white',
		alignSelf: 'center',
	}
});

export default HomeScreen;