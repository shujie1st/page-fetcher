const request = require('request');
const fs = require('fs');

let URL = process.argv[2];
let localFilePath = process.argv[3];

request(URL, (error, response, body) => {
  console.log('error', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
  fs.writeFile(localFilePath, body, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Downloaded and saved ${fs.statSync(localFilePath).size} bytes to ${localFilePath}.`);
  }
  );
});