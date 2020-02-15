/*Aadhaar.sol*/
pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import "./AuthUsers.sol";

contract Aadhaar is AuthUsers{

    struct AadhaarInfo {
        uint64 AadhaarNumber;
        string name;
        uint8 gender;
        string dob;
        string addr;
        string guardian;
    }
    mapping (uint256 => AadhaarInfo) digiIdToAadhaar;
    //bool eligibility = false;
    AuthUsers authuser = new AuthUsers();

    function setAadhaarDetails(uint256 digiId,
    string memory name,
    string memory addr,
    string memory dob,
    uint8 gender,
    string memory guardian) public returns (uint64) {
        require(msg.sender == 0xEe2F4d0E3846E3916bC79d9BfeA88AE246d1fD67, "Sorry! seems you are not admin...");
        uint64 AadhaarNo = AadharCalc();
        digiIdToAadhaar[digiId] = AadhaarInfo(AadhaarNo, name, gender, dob, addr, guardian);
        return AadhaarNo;
    }

    function AadharCalc() private pure returns(uint64) {
        return 123456789012;
    }

    function getAadhaarDetails(uint256 digiId) public returns(AadhaarInfo memory){
        require(msg.sender == 0xEe2F4d0E3846E3916bC79d9BfeA88AE246d1fD67 || authuser.getdigiIdByAddress() == digiId,
         "Sorry you have no permission to see this...");
        require(bytes(digiIdToAadhaar[digiId].name).length > 0, "Sorry! Don't have aadhaar card...");
        return digiIdToAadhaar[digiId];
    }
}