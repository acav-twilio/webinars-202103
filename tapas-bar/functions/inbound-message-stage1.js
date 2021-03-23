//How to respond based on the incoming message language language

const fetch = require('node-fetch');

  
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
                  // en español
                  
                    response = 'Hola, te atenderemos en español';
                  
                  break;
              case 'en':
                    response = 'Hi, we will serve you in English';
                    
                  break; 
              
          }
          callback(null, response);
      })
      .catch(error => {
          callback(error, null);
      })
  
  };