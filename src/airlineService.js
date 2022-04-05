// Class to connect with the contract
export class AirlineService {
    constructor(contract) {                 // contract represents the truffle contract's instance
        this.contract = contract;
    }

    // from    Account from which executes the transaction
    // value   Amount of currency to send in the transaction
    async buyFlight(flightIndex, from, value) {
        // {from, value}    Similar way to pass as it was used in the Airline.test
        return this.contract.buyFlight(flightIndex, { from, value });
    }

    async getFlights() {
        let total = await this.getTotalFlights();
        let flights = [];
        for (var i = 0; i < total; i++) {
            let flight = await this.contract.flights(i);
            flights.push(flight);
        }

        return this.mapFlights(flights);
    }

    async getCustomerFlights(account) {

        let customerTotalFlights = await this.contract.customerTotalFlights(account);
        let flights = [];
        for (var i = 0; i < customerTotalFlights.toNumber(); i++) {
            let flight = await this.contract.customerFlights(account, i);
            flights.push(flight);
        }

        return this.mapFlights(flights);
    }

    async getTotalFlights() {
        return (await this.contract.totalFlights()).toNumber();
        // return parseFloat(await this.contract.totalFlights());           // Try in case previous doesn't work
    }

    getRefundableEther(from) {
        // {from}    Pass the sender of the transaction
        return this.contract.getRefundableEther({ from });
    }

    redeemLoyaltyPoints(from) {
        // {from}    Pass the sender of the transaction
        return this.contract.redeemLoyaltyPoints({ from });
    }

    // Map to return an object with name and price
    mapFlights(flights) {
        return flights.map(flight => {
            return {
                name: flight[0],
                price: flight[1].toNumber()
            }
        });
    }
}