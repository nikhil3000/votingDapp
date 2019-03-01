pragma solidity ^0.5.1;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
contract Store is Ownable{
    
   mapping(bytes32=>uint) private voterList;
    
     function addVoter(bytes32 voter) public onlyOwner {
        voterList[voter]++;
    }
    
     function voterExist(bytes32 voter) internal view returns(bool) {
        if(voterList[voter]>0)
            return true;
        else
            return false;
    }
}