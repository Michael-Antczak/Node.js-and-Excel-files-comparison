const path = require('path');
const XLSX = require('xlsx');


// here we have the helper functions for the script to work
const AUX = require('./auxiliary');

// files used in the script
var inputFileName = 'Copy_of_DAWSONERA_AAP.xls';
var searchedFileName = "Dawsonera_Collection 10May17.xlsx";
var outputFileName = "output.xlsx";
var outputJSON = "output.json";
var outputTXT = "output.txt";

// Prepare the input file
// https://www.npmjs.com/package/xlsx
var inputWorkbook = XLSX.readFile(inputFileName);
var first_sheet_name = inputWorkbook.SheetNames[0];
var inputWorksheet = inputWorkbook.Sheets[first_sheet_name];
 
// Prepare the searched file
// https://www.npmjs.com/package/xlsx
var searchedWorkbook = XLSX.readFile(searchedFileName);
var searched_sheet_name = searchedWorkbook.SheetNames[0];
var searchedWorksheet = searchedWorkbook.Sheets[searched_sheet_name];

// Not found items - Array & string
var notFound = [];
var notFoundString = "";

/*      OUTER LOOP
        Loop ISBN cells in input file */
for (var outer = 2; outer < 4389; outer++) {

    // Set the flag 
    var found = false;

    // get the searched ISBN from input file column B
    var desired_B_cell = inputWorksheet['B' + outer];
    var searched_B_value = (desired_B_cell ? desired_B_cell.v : undefined);

    // get the searched ISBN from input file column C
    var desired_C_cell = inputWorksheet['C' + outer];
    var searched_C_value = (desired_C_cell ? desired_C_cell.v : undefined);

                // INNER LOOP - searches the searched File
                for (var inner = 2; inner < 4360; inner++) {

                    // we use replace function to normalise ISBNs
                    // Example: changes 978-879-89-21-234 to 9788798921234 
                    if (searchedWorksheet['B' + inner].v.replace(/-/g, "").includes(searched_B_value) ) {

                        found = true;

                    } 

                    // we use replace function to normalise ISBNs
                    // Example: changes 978-879-89-21-234 to 9788798921234 
                    if (searchedWorksheet['B' + inner].v.replace(/-/g, "").includes(searched_C_value) ) {

                        found = true;

                    } 

                } // end of inner loop

                
    if (found === true) {

        // reset flag, the item was found
        found = false;
    
    } else {

        // item not found, so push to notFound Array
        var temp = {}
        temp.line = outer; 
        temp.isbn = searched_B_value;
        temp.title = inputWorksheet['D' + outer].v;

        notFound.push(temp);

        // and also append the notFoundString
        notFoundString += outer + "," + searched_B_value + "," + inputWorksheet['D' + outer].v + "\n";

    }

}   // END OUTER LOOP

// Out of the both loops so print not found items
console.log("Number of items : ", notFound.length);
AUX.writeOutput(outputJSON, JSON.stringify(notFound));
AUX.writeOutput(outputTXT, notFoundString);
