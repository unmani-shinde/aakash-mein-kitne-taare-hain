const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("ProtocolModule", (m) => {

  const protocolModule = m.contract("OracularProtocol", [], {
  });

  return { protocolModule };
});
