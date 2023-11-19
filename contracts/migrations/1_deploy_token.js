const Token = artifacts.require("VoteFactory");

module.exports = function (deployer) {
  deployer.deploy(Token);
};