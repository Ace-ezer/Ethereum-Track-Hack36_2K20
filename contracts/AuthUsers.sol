pragma experimental ABIEncoderV2;
pragma solidity ^0.5.16;

contract AuthUsers {
    uint256 digits = 12;
    uint256 modulusValue = 10**digits;

    struct User {
        string name;
        string gender;
        string dob;
        string Address;
        string phoneNumber;
    }

    mapping(uint256 => address) userToId;
    mapping(address => uint256) addressTodigiId;
    mapping(address => User) userInfo;
    mapping(address => uint256) public addressToAccount;

    function registerUser(
        address _address,
        string memory _name,
        string memory _gender,
        string memory _dob,
        string memory _Address,
        string memory _phoneNumber
    ) public returns (uint256) {
        require(
            msg.sender == 0xCdE1ce5fcaf97647c4DE7D090F5063be6eA70CF7,
            "Admin not authorised."
        );
        require(addressToAccount[_address] == 0, "User already registered.");

        // Register the new user
        addressToAccount[_address] = 1;
        uint256 _digiId = uint256(keccak256(abi.encodePacked(_phoneNumber))) %
            modulusValue;
        userToId[_digiId] = _address;
        userInfo[_address] = User(_name, _gender, _dob, _Address, _phoneNumber);
        addressTodigiId[_address] = _digiId;
        return _digiId;
    }

    function searchUserBydigiId(uint256 _digiId)
        public
        view
        returns (User memory)
    {
        uint256 _id = _digiId;
        address _addr = userToId[_id];
        require(addressToAccount[_addr] > 0, "User not registered.");

        return (userInfo[_addr]);
    }

    function isUser() public view returns (bool) {
        if (addressToAccount[msg.sender] > 0) return true;
        return false;
    }

    function searchUserByaddress() public view returns (User memory) {
        require(addressToAccount[msg.sender] > 0, "User is not registered.");

        return userInfo[msg.sender];
    }

    function getdigiIdByAddress() public view returns(uint256) {
        require(addressToAccount[msg.sender] > 0,"User not registered.");
        return addressTodigiId[msg.sender];
    }
}
