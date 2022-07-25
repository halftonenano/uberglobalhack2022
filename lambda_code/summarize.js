const axios = require('axios');

function openaiRequest(passage) {

    return new Promise((resolve, reject) => {
        
        axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-002',
            prompt: `${passage}\n\nTl;dr`,
            temperature: 0.7,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        }, {
            headers: {
              'Authorization': 'Bearer ' + process.env.OPENAI_KEY
            }
        }).then((res) => { resolve(res.data) });
        
    });
}

exports.handler = async (event) => {
    
    try {
        const result = await openaiRequest(JSON.parse(event.body).text);
        
        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result),
        };
        
    } catch (error) {
        
        return {
            statusCode: 400,
            body: 'error occured',
        };
        
    }
};
