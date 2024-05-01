const { network, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");
const {verify} = require('../utils/verify')

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("30");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const args = ["0x21d624c846725abe1e1e7d662e9fb274999009aa"];
  const DecentralizedLottery = await deploy("DecentralizedLottery", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("verifying...");
    await verify(DecentralizedLottery.address, args)

    
}
log("---------------------------------------------------------")







};
module.exports.tags = ["all", "DecentralizedLottery"]