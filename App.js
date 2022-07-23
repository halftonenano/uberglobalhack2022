import { useState, useEffect } from 'react';

import {
	StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Camera, CameraType } from 'expo-camera';

import HelloWorld from './src/views/HelloWorld';
import HomeScreen from './src/views/Home';
import ScanScreen from './src/views/Scan';
import LoginScreen from './src/views/Login';

const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';

const Drawer = createDrawerNavigator();

export default function App() {
	const [ hasPermission, setHasPermission ] = useState(null);
	const [ type, setType ] = useState(CameraType.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	});

	return (
		<NavigationContainer styles={styles.navContainer}>
			<Drawer.Navigator
				initialRouteName='Scan'
				screenOptions={{
					drawerStyle: {
					backgroundColor: '#b251db',
					},
					headerStyle: {
						backgroundColor: '#b251db',
						borderBottomColor: '#b251db',
					},
					headerShown: false,
					// drawerHideStatusBarOnOpen: true,
					swipeEdgeWidth: 300,
					swipeMinDistance: 30,

					drawerActiveBackgroundColor: '#c863f2',
					drawerInactiveTintColor: 'white',
					drawerActiveTintColor: 'white',

					drawerType: 'slide',
					overlayColor: 'transparent'
				}}
			>
				<Drawer.Screen name='Home' component={HomeScreen}
					options={{ drawerIcon: ({ focused, color }) => {
						return (<Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />);
					}}}
				/>
				<Drawer.Screen name='Scan' component={ScanScreen}
					options={{ drawerIcon: ({ focused, color }) => {
						return (<Ionicons name={focused ? 'camera' : 'camera-outline'} size={24} color={color} />);
					}}}
				/>
				<Drawer.Screen name='Saved' component={HelloWorld}
					options={{ drawerIcon: ({ focused, color }) => {
						return (<Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />);
					}}}
				/>
				<Drawer.Screen name='Login' component={LoginScreen}
					options={{ drawerIcon: ({ focused, color }) => {
						return (<Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={24} color={color} />);
					}}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#b251db',
		padding: 15,
		paddingTop: 45,
		// height: '100%'
	},
	navContainer: {
		backgroundColor: '#b251db',
	}
});