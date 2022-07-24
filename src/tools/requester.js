import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export async function makeRequest(data, token, setRequestStatus, setDisplayText) {

	if (token === '') return setRequestStatus('You are not signed in');

	setRequestStatus('Resizing Image...');

	const manipResult = await manipulateAsync(
		data.uri,
		[
			{ resize: { height: 1500 } }
		],
		{ base64: true, compress: 0.8, format: SaveFormat.PNG }
	);

	setRequestStatus('Analyzing Text...');

	// const { data: dataImageText } = await axios.post('https://api.textbooktldr.com/analyze', {
	// 	image: manipResult.base64
	// }, { headers: { 'Authorization': 'Bearer ' + token } }).catch((error) => console.log(error));


	// setRequestStatus('Generating\n Summary...');

	// const { data: dataSummary } = await axios.post('https://api.textbooktldr.com/summarize', {
	// 	text: dataImageText
	// }, { headers: { 'Authorization': 'Bearer ' + token } }).catch((error) => console.log(error));


	// setRequestStatus('Complete!');
	// setTimeout(() => setDisplayText(dataSummary.choices[0].text.toString(), 1000));
}