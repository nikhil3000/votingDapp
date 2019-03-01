pragma solidity ^0.5.1;


import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Voterfactory is Ownable {

    
    mapping(bytes32=>uint) voterList;
    
   function checkHash(bytes32 voter) public view returns(bool) {
        if(voterList[voter]>0)
        return false;
        else
        return true;
    }

    function addVoter(bytes32 voter) public onlyOwner returns(bool) {
        voterList[voter]++;
        return true;
    }
    
    function getVoter(bytes32 voter) public view onlyOwner returns(uint) {
        return voterList[voter];
        
    }
    

}