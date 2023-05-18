const request = require('request');
const fs = require('fs');

const arr = process.argv.slice(2,4);
//console.log(arr[0]);
request(arr[0], (error, response, body) => {
  if(error) {
    return console.log('URL is invalid'); // Print the error if one occurred
  }
console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  fs.writeFile(arr[1], body, err => {
    if(err) {
      console.log("it is invalid");
    }
  });
  fs.readFile(arr[1], 'utf8', (err, data) => {
     if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const byte = data.length;
  console.log(`Downloaded and saved ${byte} bytes to ${arr[1]}`);
  
  });
});

