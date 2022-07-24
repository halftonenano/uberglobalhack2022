import { useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import useAccount, { TokenContext } from '../hooks/useAccount.js';

import Ionicons from '@expo/vector-icons/Ionicons';
import SigninImage from '../assets/SignIn.png';

function SignInScreen({ navigation }) {

	const { promptSignin } = useAccount();

	const { token } = useContext(TokenContext);

	return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBar}>
					<Ionicons name='menu-outline' size={35} color='white'></Ionicons>
				</TouchableOpacity>
				<Image style={styles.image} source={SigninImage} /> 
				<Ionicons name='key' style={styles.graphic} size={300} />
				<View style={styles.white}>
					<View>
						{token === '' ? (
							<TouchableOpacity
								style={styles.button}
								onPress={() => promptSignin()}
							>
								<Ionicons name='log-in-outline' style={styles.icon} size={38} />
								<Text style={styles.text}>
									Sign in
								</Text>
							</TouchableOpacity>
						) : (
							<Text style={styles.signedInAlert}>Signed in!</Text>
						)}
					</View>
				</View>
			</View>
	);
}

const styles = StyleSheet.create({
	menuBar: {
		position: 'absolute',
		top: 43,
		left: 20,
		zIndex: 10,
	},
	icon: {
		color: 'white',
		alignSelf: 'center',
		left: -15,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 25,
		alignSelf: 'center',
	},
	container: {
		backgroundColor: '#b251db',
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	image: {
		width: 120,
		height: 275,
		left: 12,
		top: '15%',
		position: 'absolute',
	},
	graphic: {
		color: '#D39AEC',
		position: 'absolute',
		right: -90,
		top: '20%'
	},
	white: {
		position: 'absolute',
		bottom: 0,
		height: '40%',
		width: '100%',
		backgroundColor: 'white',
		zIndex: 2,
		borderTopLeftRadius: 18,
		borderTopRightRadius: 18,
		// shadowColor: 'black',
		// shadowOpacity: 0.2,
		// shadowRadius: 25,
		padding: 25,
	},
	button: {
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
	signedInAlert: {
		alignSelf: 'center',
		fontSize: 40,
		color: '#b251db',
		top: 50,
	}
});

export default SignInScreen;