//pragma solidity ^0.4.23;
// SPDX-License-Identifier: MIT       // Necessary to introduce SPDX-License-Identifier in the code to avoid warnings
pragma solidity ^0.8.6;               // Updated versions\

// Contract created by default after executing 'truffle init'
contract Migrations {
  address public owner;
  uint public last_completed_migration;       // Attribute to track the last migration done in a specific net, to avoid duplicated deployments

//  constructor() public {
  constructor() {                             // Unnecessary to indicate the constructor as public, it's the default value
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
