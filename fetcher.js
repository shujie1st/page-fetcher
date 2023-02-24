const request = require('request');
const fs = require('fs');
const readline = require('readline');

// take command line arguments for URL and local file path
let URL = process.argv[2];
let localFilePath = process.argv[3];

// create interface for input and output
let rl = readline.createInterface(process.stdin, process.stdout);

request(URL, (error, response, body) => {
  console.log('error', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);

  // download the resources if local file path not exist
  if (!fs.existsSync(localFilePath)) {
    fs.writeFile(localFilePath, body, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(`Downloaded and saved ${fs.statSync(localFilePath).size} bytes to ${localFilePath}.`);
    }
    );
    rl.close();
  } else {
    // if file path already exists, user will be asked to type in "Y" or "N" to overwrite file or skip
    rl.question("File already exists! Please type in 'Y' + 'Enter' to overwrite the file! Or type in 'N' + 'Enter' to exit.", (answer) => {
      if (answer === "Y") {
        fs.writeFile(localFilePath, body, (error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log(`Downloaded and saved ${fs.statSync(localFilePath).size} bytes to ${localFilePath}.`);
        }
        );
      } else if (answer === "N") {
        console.log(`No change to the original file ${localFilePath}!`);
      }
      rl.close();
    });
  }
});