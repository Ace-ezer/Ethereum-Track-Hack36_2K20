const AuthUsers = artifacts.require('AuthUsers.sol');

module.exports = (deployer) => {
    deployer.deploy(AuthUsers);
}