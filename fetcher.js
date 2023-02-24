const request = require('request');
const fs = require('fs');
const readline = require('readline');

// take command line arguments for URL and local file path
let URL = process.argv[2];
let localFilePath = process.argv[3];


request(URL, (error, response, body) => {
  
  // if URL results in error, print error and terminate app
  if (error) {
    console.log(error);
    return;
  }

  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);

  let wrtieFile = function() {
    fs.writeFile(localFilePath, body, (error) => {
    // Print error with writing file (e.g., invalid flie path)
      if (error) {
        console.log(error);
        return;
      }
    
      console.log(`Downloaded and saved ${fs.statSync(localFilePath).size} bytes to ${localFilePath}.`);
    });
  };

  // download the resources if local file not exist
  if (!fs.existsSync(localFilePath)) {
    wrtieFile();
  } else {

    // create interface for input and output
    let rl = readline.createInterface(process.stdin, process.stdout);

    // if file path already exists, user will be asked to type in "Y" or "N" to overwrite file or skip
    rl.question("File already exists! Please type in 'Y' + 'Enter' to overwrite the file! Or type in 'N' + 'Enter' to exit.", (answer) => {
      if (answer === "Y") {
        wrtieFile();
      } else if (answer === "N") {
        console.log(`No change to the original file ${localFilePath}!`);
      }
      rl.close();
    });
  }
});