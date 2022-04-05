import React, { Component } from "react";
import Panel from "./Panel";
import getWeb3 from "./getWeb3";
import AirlineContract from "./airline";
import { AirlineService } from "./airlineService";              // Using {} because we export based on the name
import { ToastContainer } from "react-toastr";

// const defined outside the class. It's a function
const converter = (web3) => {
    return (value) => {
        return web3.utils.fromWei(value.toString(), 'ether');
    }
}

export class App extends Component {

    // First method executed in the React's component life cycle
    constructor(props) {
        super(props);                       // React component's constructor
        this.state = {                      // React component's state
            balance: 0,                     // Indicate an initial value, to avoid problems mapping to the state afterwards
            refundableEther: 0,             // Indicate an initial value, to avoid problems mapping to the state afterwards
            account: undefined,
            flights: [],                    // Indicate an initial value, to avoid problems mapping to the state afterwards
            customerFlights: []             // Indicate an initial value, to avoid problems mapping to the state afterwards
        };
    }

    // Method in the React's component lifecycle. Once the componente has been already mounted in the DOM
    async componentDidMount() {

        this.web3 = await getWeb3();

        //Start to use web3 library methods as we have already used
        this.toEther = converter(this.web3);                                            // Function to convert
        this.airline = await AirlineContract(this.web3.currentProvider);                // web3.currentProvider is MetamaskInPageProvider
        this.airlineService = new AirlineService(this.airline);

        var account = (await this.web3.eth.getAccounts())[0];

        let flightPurchased = this.airline.FlightPurchased();                           // Store the invokation of the event emitted
        flightPurchased.watch(function (err, result) {                                  // Suscribe to the event

            const { customer, price, flight } = result.args;

            if (customer === this.state.account) {
                console.log(`You purchased a flight to ${flight} with a cost of ${price}`);
            } else {
                // .success(MessageToDisplay, TitleOfTheToast)         Show a green container
                this.container.success(`Last customer purchased a flight to ${flight}           
                with a cost of ${price}`, 'Flight information');
            }

        }.bind(this));                      // Some external libraries in JS pass its own scope  --> Required to bind to the "this" React component

        // Register / Suscribe on different events
        this.web3.currentProvider.publicConfigStore.on('update', async function (event) {
            this.setState({
                account: event.selectedAddress.toLowerCase()                // Set the account to the one got from the event
            }, () => {
                this.load();
            });
        }.bind(this));                      // Some external libraries in JS pass its own scope  --> Required to bind to the "this" React component

        // Update React component's state
        this.setState({
            account: account.toLowerCase()          // Lowercase because the accounts in metasmask are in lower case while in web3 are in capital
        }, () => {
            this.load();                            // setState is async. Load is our method to initialize the application
        });
    }

    async getBalance() {
        let weiBalance = await this.web3.eth.getBalance(this.state.account);            // In wei, because it's the default value
        this.setState({
            balance: this.toEther(weiBalance)
        });
    }

    async getFlights() {
        let flights = await this.airlineService.getFlights();
        this.setState({
            flights
        });
    }

    async getRefundableEther() {
        // toEther  Convert function to convert to Ether
        let refundableEther = this.toEther((await this.airlineService.getRefundableEther(this.state.account)));
        this.setState({
            refundableEther
        });
    }

    async refundLoyaltyPoints() {
        await this.airlineService.redeemLoyaltyPoints(this.state.account);
    }

    async getCustomerFlights() {
        let customerFlights = await this.airlineService.getCustomerFlights(this.state.account);
        this.setState({
            customerFlights
        });
    }

    async buyFlight(flightIndex, flight) {

        await this.airlineService.buyFlight(
            flightIndex,
            this.state.account,
            flight.price
        );
    }

    async load() {
        this.getBalance();
        this.getFlights();
        this.getCustomerFlights();
        this.getRefundableEther();
    }

    // Executed each time that something into the React's component has changed
    render() {
        return <React.Fragment>
            <div className="jumbotron">
                <h4 className="display-4">Welcome to the Airline!</h4>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Panel title="Balance">
                        <p><strong>{this.state.account}</strong></p>        {/* Interpolation to get the value*/}
                        <span><strong>Balance</strong>: {this.state.balance}</span>
                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Loyalty points - refundable ether">
                        <span>{this.state.refundableEther} eth</span>
                        <button className="btn btn-sm bg-success text-white"
                            onClick={this.refundLoyaltyPoints.bind(this)}>Refund</button> {/* .bind(this)  Required to bind to the React's component scope*/}
                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Panel title="Available flights">
                        {this.state.flights.map((flight, i) => {                {/* i   Position of the array to iterate for mapping */}
                            return <div key={i}>                                {/* key  Unique to realize about the changes of each div */}
                                <span>{flight.name} - cost: {this.toEther(flight.price)}</span>
                                <button className="btn btn-sm btn-success text-white" onClick={() => this.buyFlight(i, flight)}>Purchase</button>
                                {/* Bootstrap classes  btn-sm  small button,  btn-success button in green  */}
                            </div>
                        })}

                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Your flights">
                        {this.state.customerFlights.map((flight, i) => {
                            return <div key={i}>
                                {flight.name} - cost: {flight.price}
                            </div>
                        })}
                    </Panel>
                </div>
            </div>

            {/* Display pop up's */}
            <ToastContainer ref={(input) => this.container = input}         {/* Store a reference of the toast */}
                className="toast-top-right" />                              {/* Show in the top right corner */}
        </React.Fragment>
    }
}