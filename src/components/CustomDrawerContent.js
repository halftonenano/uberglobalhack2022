import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
  
export default function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
}