const https = require('https');
const http = require('http');


//Function to print message to console

function printError(error) {
   console.error(error.message);
}
function get (company) {
   try {
      //Connect to the PAI URL (https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10)
         const request = https.get(`https://api.iextrading.com/1.0/stock/${company}/batch?types=quote`, response => {
                                    if (response.statusCode === 200) {
                                       let body = '';
                                       //Read the data
                                       response.on('data', data => {
                                       body += data.toString()
                                       });

                                       response.on('end', () => {
                                          try {
                                             //Parse the data
                                             const companyInfo = JSON.parse(body);
                                             //Print the data
                                             console.log(`${companyInfo.quote.latestTime} price ${companyInfo.quote.companyName} is ${companyInfo.quote.close}`);
                                          } catch (e) {
                                             printError(e);
                                          }
                                       });
                                    } else {
                                       const message = `There is an error, getting info for ${company} (${http.STATUS_CODES[response.statusCode]})`
                                       const statusCodeEror = new Error(message)
                                       printError(statusCodeEror);
                                    }
                                 });
         request.on('error', error => console.error(`You have problem with: ${error.message}`));
   } catch (error) {
      printError(error);
   }
}

module.exports.get = get;
