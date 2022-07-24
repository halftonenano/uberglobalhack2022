import { useState, useEffect, useContext } from 'react';
import {
	StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import CustomDrawerContent from './src/components/CustomDrawerContent';

import Ionicons from '@expo/vector-icons/Ionicons';

import { StatusBar } from 'expo-status-bar';

import { TokenContext } from './src/hooks/useAccount';

import HomeScreen from './src/views/HomeScreen';
import ScanScreen from './src/views/ScanScreen';
import SignInScreen from './src/views/SignInScreen';
import SavedScreen from './src/views/SavedScreen';

const Drawer = createDrawerNavigator();

export default function App() {

	const [ token, setToken ] = useState('');

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			<NavigationContainer styles={styles.navContainer}>
				<Drawer.Navigator
					initialRouteName={'Home'}
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
					drawerContent={CustomDrawerContent}
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
					<Drawer.Screen name='Saved' component={SavedScreen}
						options={{ drawerIcon: ({ focused, color }) => {
							return (<Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />);
						}}}
					/>
					<Drawer.Screen name='Sign in' component={SignInScreen}
						options={{ drawerIcon: ({ focused, color }) => {
							return (<Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={24} color={color} />);
						}}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
			<StatusBar style="light" />
		</TokenContext.Provider>
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