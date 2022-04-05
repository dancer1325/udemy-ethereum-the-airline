import Web3 from 'web3';

const getWeb3 = () => {
    return new Promise( (resolve, reject) => {
        // Listener on load event. Make sure the page has been loaded or emitted the load event --> Metamask extension is available
        window.addEventListener('load', function() {
            let web3 = window.web3;     // web3 used by metamask

            if(typeof web3 !== undefined) {                 // web3 is available in the browser
                web3 = new Web3(web3.currentProvider);      // Web3 is the constructor of the version imported in the package.json.   web3.currentProvider is Metamask
                resolve(web3);
            } else {
                console.error("No provider found, please install Metamask");
                reject();
            }
        });
    });
};

export default getWeb3;