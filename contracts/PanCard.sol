pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import "./Aadhaar.sol";
//import "./PanCard.sol";
import "./TenthMarksheet.sol";
import "./AuthUsers.sol";
 
contract PanCard is AuthUsers, Aadhaar, TenthMarksheet {

    Aadhaar aadhaar = new Aadhaar();
    //panCard pancard = new panCard();
    TenthMarksheet tenth = new TenthMarksheet();

    struct Pan {
        string panNumber;
        string SO;
        string pic;
        string name;
        string sig;
        string DOB;
    }
    mapping (uint64 => Pan) digiIdToPan;
    mapping (string => uint64) PanNumToDigiId;

    bool eligibility;
    function setPanCardDetails(
        uint64 digiId,
        string memory name,
        string memory DOB,
        string memory panNumber,
        string memory daughterOf) public returns(string memory) {
        require(msg.sender == 0x6deA0eB6Fd96340DD59E55e40B6ef1f990027115 && eligibility == true,
         "You are not eligible");
        string memory Number = calcPan();
        digiIdToPan[digiId] = Pan(panNumber, daughterOf, "", name, "", DOB);
        PanNumToDigiId[Number] = digiId;
        return Number;
    }

    function display(uint64 digiId) public {
        if(aadhaar.getAadhaarDetails(digiId).AadhaarNumber != 0 && tenth.getTenthDetails(digiId).RollNo != 0)
        {
            eligibility = true;
        }
        else
        {
            eligibility = false;
        }
    }

    function calcPan() private pure returns(string memory) {
        return "666";
    }

    function getPanCardDetails(uint64 digiId) public view returns(Pan memory) {
        require(msg.sender == 0x6deA0eB6Fd96340DD59E55e40B6ef1f990027115 || authuser.getdigiIdByAddress() == digiId,
         "Sorry you have no permission to see this...");
        require(bytes(digiIdToPan[digiId].panNumber).length > 0,"Document is not Available...");
        return digiIdToPan[digiId];
    }
}