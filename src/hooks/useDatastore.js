import AsyncStorage from '@react-native-async-storage/async-storage';


export function useDatastore() {

	const addNewItem = async (item) => {
		const currentData = await JSON.parse(await getData());

		if (!Array.isArray(currentData.array)) {
			await storeData(JSON.stringify({ array: [ item ] }));
		} else {
			const newArray = [ item ].concat(currentData.array);
			await storeData(JSON.stringify({ array: newArray }));
		}
	}

	const removeAllItems = async () => {
		await storeData(JSON.stringify({ array: [] }));
	}

	const overWriteItems = async (array) => {
		await storeData(JSON.stringify({ array: array }));
	}

	const deleteItemAtIndex = async (index) => {

		let { array } = await getAllItems();
		array.splice(index, 1);

		await storeData(JSON.stringify({ array: array }));

		return { array: array };
	}

	const getAllItems = async () => {
		const currentData = await getData();
		if (currentData === null) { return { array: [] } }
		return JSON.parse(currentData);
	}
	
	return { addNewItem, removeAllItems, getAllItems, deleteItemAtIndex, overWriteItems };
}

async function storeData(value) {
	try {
		await AsyncStorage.setItem('@saved_summaries', value);
	} catch (e) {
		// error saving
		console.log('error saving');
	}
}

async function getData() {
	try {
		const value = await AsyncStorage.getItem('@saved_summaries');
		return value;
	} catch(e) {
		// error reading value
		console.log('error reading value');
	}
}