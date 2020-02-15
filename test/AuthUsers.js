const AuthUsers = artifacts.require('AuthUsers.sol');

contract('AuthUsers', async (accounts) => {
    let app, digiId;

    before(async () => {
        app = await AuthUsers.deployed();
        digiId = await app.registerUser.call("Arpit", "M", "07-07-1999", "Lko", "9936707796");
        await app.registerUser("Arpit", "M", "07-07-1999", "Lko", "9936707796");
    });

    describe('Register test..', async () => {

        it('deploys Successfully', async () => {
            const address = await app.address;

            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('Should register a user', async () => {
            count = await app.addressToAccount(accounts[0]);
            res = await app.loginUser(digiId);
            console.log(digiId);
            assert.equal("Arpit", res.name, "Name is not ok.");
            assert.equal("M", res.gender, "Gender is not ok.");
            assert.equal("9936707796", res.phoneNumber, "phoneNumber is not okay.");
            assert.equal(1, count, "Count should be 1.");
        });
    });
});