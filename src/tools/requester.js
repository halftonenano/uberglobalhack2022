import axios from "axios";

export async function makeRequest(data) {

	axios.post('https://n3pie4yytnaqfodimpqzu2dtti0afhcu.lambda-url.us-west-1.on.aws/', {
		image: data
	}).then((response) => {
		console.log(response.data);
	});

	// console.log('NOTHelloWorld');
}