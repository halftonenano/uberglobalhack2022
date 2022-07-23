import { StyleSheet, Image, Text } from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';

import ContinuityLogo from '../assets/continuity_side.png';
  
export default function CustomDrawerContent(props) {
	return (
		<>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<Image style={styles.logo} source={ContinuityLogo} />
		</>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: undefined,
		height: 280,
		aspectRatio: 532 / 2424,
		position: 'absolute',
		bottom: 35,
		left: 15
	}
});