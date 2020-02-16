/*TenthMarksheet.sol*/
 
pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;
 
contract TenthMarksheet{

    struct TenthInfo {
        uint64 RollNo;
        string name;
        string dob;
        string guardian;
        uint16 percent;//divide by 10 to get actual answer; executed on user side to save ether.
        bool pass_status;
        string board;
    }
    mapping(uint64 => TenthInfo) digiIdToTenth;
    bool eligibility = false;
 
    function setTenthDetails(uint64 digiId,
    uint64 RollNo,
    string memory name,
    string memory dob,
    string memory guardian,
    uint16 percent,
    bool pass_status,
    string memory board) public {
        require(msg.sender == 0x814A3083Ceb549C6d93DaE42c9D3944f95bd28bA, "Sorry! seems you are not admin...");
        digiIdToTenth[digiId] = TenthInfo(RollNo, name, dob,
                                guardian, percent, pass_status, board);
    }
 
    function getTenthDetails(uint64 digiId) public view returns(TenthInfo memory) {
        require(digiIdToTenth[digiId].RollNo != 0, "User doesn't exists");
            return digiIdToTenth[digiId];
    }
 
}