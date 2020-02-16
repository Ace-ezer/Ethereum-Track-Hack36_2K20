const AuthUsers = artifacts.require('AuthUsers.sol');
const Marksheet = artifacts.require('TenthMarksheet.sol');

module.exports = (deployer) => {
    deployer.deploy(AuthUsers);
    deployer.deploy(Marksheet);
}