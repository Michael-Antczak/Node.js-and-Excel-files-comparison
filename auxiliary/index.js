const fs = require('fs');

// write the output data into the given file
exports.writeOutput = (file, text) => {

    console.log("Going to write into existing file");
    fs.writeFile(file, text,  function(err) {
    
    if (err) {
        return console.error(err);
    }

    console.log("Data written successfully!");

    });
}

