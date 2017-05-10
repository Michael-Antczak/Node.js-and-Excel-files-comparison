# Node.js and Excel files comparison
A wee job at work. Compare two Excel files against each other and find unique rows. Each with almost 5000 records. 

#### Input file
`Copy_of_DAWSONERA_AAP.xls`

#### Searched file
`Dawsonera_Collection 10May17.xlsx`

#### What it does
Script takes ISBN from column B and C in the input file and searches the corresponding column B in the searched file. If match is found then carry on, if not than populate `notFound` Array and `notFoundString`. These are later used to populate the output files. 

#### Outcome
116 unique items were identified for further analysis. 

