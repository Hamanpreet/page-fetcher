// import the request, fs and readline libraries
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const arr = process.argv.slice(2,4);

// const r1 = readline.createInterface({
//   input : process.stdin,
//   output : process.stdout
// });


request(arr[0], (error, response, body) => {
  if(error) {
    return console.log('URL is invalid'); // Print the error if one occurred
  }
  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);
  // Print the HTML for the Google homepage.
  console.log('body:', body);
  fs.writeFile(arr[1], body, err => {
    if(err) {
      console.log("it is invalid");
    }
  });

  //calculating size in bytes this way
  fs.readFile(arr[1], 'utf8', (err, data) => {
     if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const byte = data.length;
  console.log(`Downloaded and saved ${byte} bytes to ${arr[1]}`);
  });
});
