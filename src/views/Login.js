import { useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import useAccount, { TokenContext } from '../hooks/useAccount.js';

import Ionicons from '@expo/vector-icons/Ionicons';
import SigninImage from '../assets/SignIn.png';

function LoginScreen() {

	const { promptSignin } = useAccount();

	const { token } = useContext(TokenContext);

	return (
			<View style={styles.container}>
				<Image style={styles.image} source={SigninImage} /> 
				<View style={styles.white}>
					<View>
						<TouchableOpacity
							style={styles.button}
							onPress={() => promptSignin()}
						>
							{<Ionicons name="log-in-outline" style={styles.icon}></Ionicons>}
							<Text style={styles.text}>
								Sign in
							</Text>
						</TouchableOpacity>
						{token !== '' && <Text>{token}</Text>}
					</View>
				</View>
			</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		fontSize: 30,
		color: '#FFFFFF',
		textAlign: 'center',
		left: 10,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 30,
		textAlign: 'center',
		left: 90
	},
	container: {
		backgroundColor: '#b251db',
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	image: {
		width: 100,
		height: 275,
		left: 10,
		top: 60,
		zIndex: 2,
	},
	white: {
		backgroundColor: '#FFFFFF',
		height: '40%',
		width: '100%',
		zIndex: 4,
		bottom: -15,
		position: 'absolute',
		borderRadius: 25,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 25,
	},
	button: {
		flexDirection: 'row',
		backgroundColor: '#b251db',
		alignSelf: 'center',
		paddingVertical: 15,
		width: '88%',
		borderRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 15,
		alignContent: 'flex-end',
		zIndex: 3,
		marginVertical: 25,
	},
});

export default LoginScreen;