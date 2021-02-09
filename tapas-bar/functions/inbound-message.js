const fetch = require('node-fetch');

const dialogflow = require('dialogflow');

const projectId = 'tapasbar-300215';
const dfConfig = {
    credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_ID
    }
}


async function detectIntent(query, lang) {
  // New session client
  const sessionClient = new dialogflow.SessionsClient(dfConfig);
        console.log('after session client');

  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.sessionPath(projectId, '123456');
        console.log('after session path');


  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: lang,

      },
    },
  };
        console.log('after request');


  const responses = await sessionClient.detectIntent(request);
 
  
    console.log(`after response ${responses[0].toString()}`);

  return responses[0];
}

async function executeQuery(query, lang) {
    let queryResult = {};
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(query, lang);
      
      console.log('Detected intent');
      console.log(
        `Intent Name: ${intentResponse.queryResult.intent.displayName}`
      );
       
      // Use the context from this response for next queries
      queryResult.success = true
      queryResult.intent = intentResponse.queryResult.intent.displayName
      queryResult.parameters = intentResponse.queryResult.parameters;
    } catch (error) {
      console.log('executeQuery() error\n');
      console.log(error);
      queryResult.success = false
    }
    return queryResult;
}

function detectLanguage(text) {
    body = {
        q: text
    }

    return fetch('https://translation.googleapis.com/language/translate/v2/detect?key=' + process.env.TRANSLATE_API_KEY, {
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }, 
    })
    .then(response => response.json())
    .then(resJson => Promise.resolve(resJson.data.detections[0][0].language));
}

exports.handler = function(context, event, callback) {
    detectLanguage(event.Body)
    .then(language => {
        console.log(language);
        let response = ''
        switch (language) {
            case 'es':
                // es español
                executeQuery(event.Body, 'es')
                .then(result => {
                        
                     console.log(result.toString());
                    if (result.intent === 'pedido') {
                        response = `¡Gracias! Estamos preparando  ${result.parameters.fields.number.numberValue} ${result. parameters.fields.any.stringValue}`; 
                    } else 
                        if(result.intent ==='Default Welcome Intent'){
                            response = '¡Hola! ¿Qué puedo servirle?';
                        }
                        else {
                            response = 'Lo siento, no le he entendido. ¿Podría decírmelo otra vez?';
                        }
                    callback(null, response);
                })
                .catch( error => {
                   console.log(error); 
                   callback(null, error);
                });
                
                break;
            case 'en':
            executeQuery(event.Body, 'en')
                .then(result => {
                    if (result.intent === 'command') {
                        response = `Thank you! We are getting  ${result.parameters.fields.number.numberValue} ${result. parameters.fields.any.stringValue} ready for you.`; 
                    } else {
                        response = 'Sorry, I did not understand. Could you repeat again?';
                    }
                    callback(null, response);
                })
                break; 
            
        }
        
    })
    .catch(error => {
        callback(error, null);
    })
};