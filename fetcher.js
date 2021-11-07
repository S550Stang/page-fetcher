const userInput = process.argv.slice(2);
// [ 'http://www.example.edu/', './index.html' ]

const request = require("request");
const filesys = require("fs");
let stats = filesys.statSync("index.html");
let fileSizeInBytes = stats.size;
let url = userInput[0];
console.log(url);
request(url, (error, response, body) => {
  if (error) {
    console.log("error: URL not found");
  } // Print the error if one occurred
  if (response.statusCode === 404) {
    console.log(
      "statusCode:",
      response && response.statusCode + " missing page"
    );
  } else {
    console.log("statusCode:", response && response.statusCode);
    if (body) {
      filesys.appendFile(userInput[1], body, function (err) {
        if (err) {
          console.log("failed to download");
        } else {
          console.log(
            `Downloaded and saved ${fileSizeInBytes} bytes to ${userInput[1]}.`
          );
        }
        //download the html body to index.html
      });
    }
  }
});
