# The Airline - An Ethereum learning DAPP

**Source template for my Udemy Ethereum training course at Udemy**

**If you want to get the final version of the code you can check the [final](https://github.com/CarlosLanderas/udemy-ethereum-the-airline/tree/final) branch**

# Structure of the project
* 'contracts' and 'migrations' folders
  * Typical folders in a project using truffle
* 'src' folder
  * Typical web page based on react

# How to run?
* `npm install`
  * Install all the dependencies
* `npm run start` / `npm start` 
  * start. Script created to run the server
  * Open the browser in 'localhost:8080'

# Notes
* Libraries to use
  * 'webpack-dev-server'
    * Development in memory server which provide live reloading
  * 'webpack'
    * Module bundler
      * Characteristics
        * Bundle JS files for usage in a browser
        * Transform / Bundle / Package any resource / asset
  * 'webpack-cli'
    * CLI of webpack
  * 'babel-core'
    * Babel compiler core
    * '.babelrc'
      * Local configuration file
  * 'babel/core'
    * Replacement of 'babel-core'
  * 'babel-loader'
    * Characteristics
      * JS files can be transpiled using Babel and webpack
  * 'babel-preset-env'
    * Characteristics
      * <ES2015+ is compiled to ES5 based on the Babel plugins
  * '@babel/preset-env'
    * Replacement of babel-preset-env
  * 'babel-preset-react'
    * Babel preset for all React plugins
  * '@babel/preset-react'
    * Replacement of 'babel-preset-react'
  * 'babel-plugin-transform-async-to-generator'
    * Characteristics
      * Async functions turn into ES2015 generators
  * '@babel/plugin-transform-async-to-generator'
    * Replacement of 'babel-plugin-transform-async-to-generator'
  * 'babel-polyfill'
    * Characteristics
      * TODO: What is it used for?
  * '@babel/polyfill'
    * Replacement of 'babel-polyfill'
  * 'html-webpack-plugin'
    * Simply the creation of HTML files to server your bundles
  * 'react'
    * JS library for creating UI
  * 'react-dom'
    * Characteristics
      * Entry point to 
        * DOM
        * Server renderers for React
  * 'react-toastr'
    * Characteristics
      * Display a list of toast messages
    * Problems:
      * Problem1: It doesn't support react, react-dom > 15
        * Solution: Use react versions 15.
        * Note: https://github.com/tomchentw/react-toastr/issues/124
  * 'truffle-contract'
    * Characteristics
      * Ethereum contract abstraction for
        * Node
        * Browser
    * Problems:
      * Problem1: `Critical dependency: the request of a dependency is an expression` for scrypt.js 
        * Note: https://github.com/trufflesuite/truffle/issues/3009
        * Solution: TODO: How to fix it? 
  * '@truffle/contract'
    * Replacement of 'truffle-contract'
    * Problems:
      * Problem1: `Critical dependency: require function is used in a way in which dependencies cannot be statically extracted` for ethers.min.js 
        * Note: Nothing relevant found. Similar to https://github.com/ethers-io/ethers.js/issues/2045
        * Solution: TODO: How to fix it?
  * '@truffle/hdwallet-provider'
    * Provider to use Mnemonic words to connect to other networks 



