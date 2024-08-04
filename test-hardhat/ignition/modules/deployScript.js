const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorldModule", (m) => {

  const contractInstance = m.contract("HelloWorld", [], {
  });

  return { contractInstance };
});
