pragma solidity ^0.5.1;


import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Poll.sol";

contract Voterfactory is Ownable {

    address private storageContract;    
    Poll [] pollAddList; 
    
    constructor (address _store) public 
    {
        storageContract = _store;
    }
    
    event Print(Poll);
    event PrintPollAddList(Poll[]);
  
    function createPoll(string memory question) public returns(Poll){
        Poll obj = new Poll(question,storageContract);
        pollAddList.push(obj);
        emit Print(obj);
        return obj;
    }
    
    function getPollAddList() public {
        emit PrintPollAddList(pollAddList);
    }
    
    function getStorageContract() public view returns (address)
    {
        return storageContract;
    }
    
    function setStorageContract(address _store) public onlyOwner {
        storageContract = _store;        
    }
}

