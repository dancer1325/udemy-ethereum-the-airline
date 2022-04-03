# The Airline - An Ethereum learning DAPP

**Source template for my Udemy Ethereum training course at Udemy**

**If you want to get the final version of the code you can check the [final](https://github.com/CarlosLanderas/udemy-ethereum-the-airline/tree/final) branch**

# Structure of the project
* 'contracts' and 'migrations' folders
  * Typical folders in a project using truffle
* 'src' folder
  * Typical web page based on react

# How to compile?
* `truffle compile`

# How to run?
* `npm install` / `npm install --force`
    * Install all the dependencies
* `npm run start` / `npm start`
    * start. Script created to run the server
    * Open the browser in 'localhost:8080'

# Ways of doing integration tests?
* Mocha + web3
* truffle
  * The way to proceed here
  * `contract(...)..`
    * Replace `describe(..)`  in mocha
  * `truffle test`
    * Run all tests
    * `-g "NameOfTheIt"` 
      * Allows running a specific it
    * Problems: 
      * Problem1: "Error: sender doesn't have enough funds to send tx. ..."
        * Solution: Restart Ganache, because we are reusing the same session of Ganache and consuming gas
  * How to debug?
    * Don't do anything marking the line as break point
    * `... debug(SomeContractOperation)`
      * Just possible to debug contract's operations
    * `truffle test --debug`

