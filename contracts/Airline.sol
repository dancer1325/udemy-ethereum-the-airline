//pragma solidity ^0.4.24;

// SPDX-License-Identifier: MIT       // Necessary to introduce SPDX-License-Identifier in the code to avoid warnings
pragma solidity ^0.8.6;               // Updated versions\

contract Airline {

  address public owner;

    // Each customer in our smart contract
  struct Customer {
      uint loyaltyPoints;
      uint totalFlights;
  }  

  struct Flight {
      string name;
      uint256 price;                // uint by default it's uint256
  }

  uint etherPerPoint = 0.5 ether;   // Relation ether/point

    // Global variable to store the flights
  Flight[] public flights;

    // All users are identified by the Address
  mapping(address => Customer) public customers;
  mapping(address => Flight[]) public customerFlights;      // Each user can buy several flights --> Flight[]
  mapping(address => uint) public customerTotalFlights;

    // Emit events are relevant to represent real time in web page
    // indexed  Event parameter to store the parameter as topic
  event FlightPurchased(address indexed customer, uint price, string flight);

  constructor() {
      owner = msg.sender;                               // Owner is the account which deploys the smart contract

      // Add elements to global variable from the creation of the contract, as business requirement in this example
      flights.push(Flight('Tokio', 4 ether));
      flights.push(Flight('Germany', 3 ether));
      flights.push(Flight('Madrid', 3 ether));
  }   

    // flightIndex   Index of the array of flights
    // payable  It's required to pass money to invoke this method
  function buyFlight(uint flightIndex) public payable {
      Flight memory flight = flights[flightIndex];

      // Restriction. Money passed by the invoker of the method must be equal to the price of the flight
      require(msg.value == flight.price);

      // Retrieve Customer in case already exists in the smart contract, or if not, it's created
      // Storage  Because next modifications will be persisted
      Customer storage customer = customers[msg.sender];
      customer.loyaltyPoints += 5;              // Business requirement in our case
      customer.totalFlights += 1;
      customerFlights[msg.sender].push(flight);
      customerTotalFlights[msg.sender] ++;

      // Emit an event
      emit FlightPurchased(msg.sender, flight.price, flight.name);          // Necessary to mark the emission of the event
  }

  function totalFlights() public view returns (uint) {
      return flights.length;
  }

    // Refund to the customer / sender of the transaction based on the loyaltyPoints
  function redeemLoyaltyPoints() public {
      Customer storage customer = customers[msg.sender];    // Storage  Necessary to persist the information updated about the customer
      uint etherToRefund = etherPerPoint * customer.loyaltyPoints;
      payable(msg.sender).transfer(etherToRefund);          // Necessary to mark as payable
      customer.loyaltyPoints = 0;
  }

    // Check by the customer the ether that he/she would receive when he/she refunds their loyaltyPoints
  function getRefundableEther() public view returns (uint) {
      return etherPerPoint * customers[msg.sender].loyaltyPoints;
  }

    // isOwner  Only possible to get the information the person who created the smart contract
  function getAirlineBalance() public isOwner view returns (uint) {
      // this  Contract's instance
      address airlineAddress = address(this);       // Necessary to mark the casting to address for the contract
      return airlineAddress.balance;
  }

  modifier isOwner() {
      require(msg.sender == owner);
      _;
  }
}