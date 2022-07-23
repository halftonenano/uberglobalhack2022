import axios from "axios";

export async function makeRequest() {

	axios.post('https://n3pie4yytnaqfodimpqzu2dtti0afhcu.lambda-url.us-west-1.on.aws/', {
		thing1: 'really long text that needs shortening'
	}).then((response) => {
		console.log(response.data);
	});

	// console.log('NOTHelloWorld');
}