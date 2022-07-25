const AWS = require('aws-sdk');

const client = new AWS.Rekognition();

exports.handler = async (event, context, callback) => {
	
	const image = JSON.parse(event.body).image;

	const bytes = new Buffer(image, 'base64');
	
	const result = await detectText(bytes)

	if (!!result.TextDetections) {
		let textArray = [];
		let textString = ''
		
		await result.TextDetections.forEach((item) => {
			textArray.push(item.DetectedText);
			textString = `${textString}${item.DetectedText} `;
		});
		
		callback(null, textString);
	} else {
		callback(null, 'bad')
	}
};

async function detectText(imageData) {
	const params = {
		Image: {
		    Bytes: imageData
		},
	}

   return client.detectText(params).promise().then(data => {
		return data;
   }).catch(error => {
		console.log(error);
		return error;
   });  
}