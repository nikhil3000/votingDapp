pragma solidity ^0.5.1;

import "./Storage.sol";

library Lpoll {
    function callVoterExist(address _storageContract, bytes32 voterHash) public view returns (bool)
    {
        return  Store(_storageContract).voterExist(voterHash);
    }
    
    function callAddVoter(address _storageContract, bytes32 voterHash) public view
    {
        Store(store).addVoter(voterHash); 
    }
}