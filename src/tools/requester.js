import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export async function makeRequest(data, token) {

	const manipResult = await manipulateAsync(
		data.uri,
		[
			{ resize: { height: 1500 } }
		],
		{ base64: true, compress: 0.8, format: SaveFormat.PNG }
	);

	axios.post('https://api.textbooktldr.com/analyze', {
		image: manipResult.base64
	}, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then((response) => {
		console.log(response.data);
	}).catch((error) => console.log(error));

	axios.post('https://api.textbooktldr.com/summarize', {
	}, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then((response) => {
		console.log(response.data);
	}).catch((error) => console.log(error));
}