import { useContext } from 'react';
import {
	 View, 
	 Text, 
	 StyleSheet,
	 Image,
	 TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeImage from '../assets/Home.png';

import useAccount, { TokenContext } from '../hooks/useAccount.js';

function HomeScreen({ navigation }) {

	const { promptSignin } = useAccount();
	const { token } = useContext(TokenContext);

	return (
		<View style={styles.background}>
			<Image style={styles.image} source={HomeImage} />
			<Ionicons name='newspaper' style={styles.graphic} size={300} />
			<View style={styles.whiteBackground}>
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<View style={styles.row}>
						<Ionicons name='chevron-forward-outline' style={styles.arrow} size={40}/>
						<Text style={styles.text}>
							swipe or tap to{'\n'}access menu
						</Text>
					</View>
				</TouchableOpacity>

				{token !== '' ? (
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('Scan')}
					>
						<Ionicons name='camera-outline' style={styles.icon} size={50}/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={() => promptSignin()}
					>
						<Ionicons name='log-in-outline' style={[ styles.icon, styles.iconWithLabel ]} size={38} />
						<Text style={styles.iconLabel}>Sign in</Text>
					</TouchableOpacity>
				)}

				
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		left: -20
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
		top: '13%',
		position: 'absolute',
	},
	graphic: {
		color: '#D39AEC',
		position: 'absolute',
		right: -200,
		top: '13%'
	},
	whiteBackground: {
		position: 'absolute',
		bottom: 0,
		height: '45%',
		width: '100%',
		backgroundColor: 'white',
		zIndex: 2,
		borderTopLeftRadius: 18,
		borderTopRightRadius: 18,
		// shadowColor: 'black',
		// shadowOpacity: 0.2,
		// shadowRadius: 25,
		padding: 35,
		paddingTop: 20,
	},
	text: {
		color: '#b251db',
		fontWeight: 'bold',
		fontSize: 21,
		alignSelf: 'center',
		left: 25,
	},
	arrow: {
		color: '#b251db',
		left: 10,
		alignSelf: 'center',
	},
	button: {
		position: 'absolute',
		bottom: 35,
		flexDirection: 'row',
		backgroundColor: '#b251db',
		alignSelf: 'center',
		paddingVertical: 15,
		width: '100%',
		borderRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		justifyContent: 'center',
		zIndex: 3,
	},
	icon: {
		color: 'white',
		alignSelf: 'center',
	},
	iconWithLabel: {
		color: 'white',
		alignSelf: 'center',
		left: -15,
	},
	iconLabel: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 25,
	},
});

export default HomeScreen;