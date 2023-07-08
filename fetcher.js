// import the request, fs and readline libraries
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const arr = process.argv.slice(2,4);

const r1 = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});



request(arr[0], (error, response, body) => {
  if(error) {
    return console.log('URL is invalid'); // Print the error if one occurred
  }
  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);
  // Print the HTML for the Google homepage.
  console.log('body:', body);
  const check = function () {
    fs.access(arr[1], (err) => {
      if (!err) {
        r1.question('File already exists. Do you want to overwrite it? (Y/N):', (answer) => {
          if (answer.toLowerCase() === 'y') {
            writeFile(arr[1], body);
          } else {
            console.log('File not overwritten. Exiting the app.');
            r1.close();
          }
        });
      } else {
        writeFile(arr[1], body);
      }
    });
  };

  function writeFile(filePath, fileData) {
    fs.writeFile(filePath, fileData, (err) => {
      if (err) {
        console.log('Failed to write the file:', err);
      } else {
        console.log(`File ${filePath} created successfully.`);

        // After writing the file, read its contents
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading file:', err);
            return;
          }
          const byte = Buffer.byteLength(data, 'utf8');
          console.log(`Downloaded and saved ${byte} bytes to ${filePath}`);
        });
      }
    });
  }

  check();
});


