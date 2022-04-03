const Airline = artifacts.require('Airline');

let instance;

beforeEach(async () => {
    // Airline.deployed()                   // deployed  Return the smart contract deployed in a net
    instance = await Airline.new();         // Deploy a new smart contract in the net
});

// contract is equivalent to describe in truffle
// accounts  Give directly the accounts, without having to ask such as in web3 with getAccounts method
contract('Airline', accounts => {
    it('should have available flights', async () => {

        let total = await instance.totalFlights();
        // If we use web3 --> We need to use instance.methods.totalFlights()

        assert(total > 0);
    });

    it('should allow customers to buy a flight providing its value', async () => {

        // await debug (let flight = await instance.flights(0));        // Since we are wrapping an assignment --> Flow not interrupted
        let flight = await debug(instance.flights(0));      // Stop the flow, allowing debug contract's operations
        let flightName = flight[0], price = flight[1];      // Define several variables in the same line
        console.log("flightName: " + flightName)
        console.log("price: " + price)

        // { from: ...}  Indicate the account from which it's bought, since it's payable the method
        await instance.buyFlight(0, { from: accounts[0], value: price });

        // Invoking a mapping
        // If you send 2 arguments, it's because the value is an array, so you can get 1 specific element of the array
        let customerFlight = await instance.customerFlights(accounts[0], 0);        // Get the first flight of the customer
        // If you send 1 argument, it's the key of the mapping
        let customerTotalFlights = await instance.customerTotalFlights(accounts[0]);

        assert(customerFlight[0], flightName);
        assert(customerFlight[1], price);
        assert(customerTotalFlights, 1);
    });

    it('should not allow customers to buy flights under the price', async () => {

        let flight = await instance.flights(0);
        let price = flight[1] - 5000;
        try {
            // { from: ...}  Indicate the account from which it's bought, since it's payable the method
            // It throws an error, because it doesn't pass the restriction require
            await instance.buyFlight(0, { from: accounts[0], value: price });
        }
        catch (e) {
            console.log(e);
            return;                 // Not to continue executing the code
        }

        // It will be reached just in case, buyFlight doesn't throw an error
        assert.fail();
    });

    it('should get the real balance of the contract', async() => {

        let flight = await instance.flights(0);
        let price = flight[1];

        let flight2 = await instance.flights(1);
        let price2 = flight2[1];

        // { from: ...}  Indicate the account from which it's bought, since it's payable the method
        await instance.buyFlight(0, { from: accounts[0], value: price});
        await instance.buyFlight(1, { from: accounts[0], value: price2});

        let newAirlineBalance = await instance.getAirlineBalance();

        console.log("newAirlineBalance " + newAirlineBalance);

        // price, price2 and newAirlineBalance.  They are bigNumbers, then doing the assert, they are compared as objects --> Required to convert as numbers
        // assert.equal(newAirlineBalance.toNumber(), price.toNumber() + price2.toNumber());            // Not valid in Truffle ^5
        assert.equal(parseFloat(newAirlineBalance), parseFloat(price) + parseFloat(price2));
    });

    it('should allow customers to redeem loyalty points', async() => {
        
        let flight = await instance.flights(1);
        let price = flight[1];

        // { from: ...}  Indicate the account from which it's bought, since it's payable the method
        await instance.buyFlight(1, { from: accounts[0], value : price});

        let balance = await web3.eth.getBalance(accounts[0]);
        // { from: ...}  Indicate the account from which it's invoked the method to redeem the loyaltypoints in ether
        await instance.redeemLoyaltyPoints({from: accounts[0]});
        let finalBalance = await web3.eth.getBalance(accounts[0]);
        console.log("balance " + balance);
        console.log("finalBalance " + finalBalance);

        let customer = await instance.customers(accounts[0]);
        let loyaltyPoints = customer[0];            // Retrieve the first attribute of the Customer, which it's loyaltyPoints

        assert(loyaltyPoints, 0);
        assert(finalBalance > balance);
    });
});