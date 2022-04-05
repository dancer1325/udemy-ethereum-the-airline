import AirlineContract from "../build/contracts/Airline.json";      // File generated when you run 'truffle compile'
// It possible to use / read it, because webpack has got a loader of json. If not it would be necessary to implement AJAX call

import contract from "@truffle/contract";
// import contract from "truffle-contract";

// provider is any web3 provider (HTTPProvider, WebSocketProvider, MetamaskInPageProvider is our case)
export default async(provider) => {
    const airline = contract(AirlineContract);
    airline.setProvider(provider);

    let instance = await airline.deployed();            // Create a contract's instance
    return instance;
};