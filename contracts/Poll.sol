pragma solidity ^0.5.1;

import './Library/Lpoll.sol';


contract Poll {
    using Lpoll for address;
    string private question;
    mapping(string=>uint) pollList;
    mapping(string=>uint) options;
    address private store;
    
    constructor (string memory _question, address _store) public
    {
        question = _question;
        store = _store;
    }
    
    function addOptions(string memory option) public
    {
        options[option] = 0;
    }

    function getQuestion() view public returns (string memory) 
    {
        return question;
    }
    
    function vote(string memory option, string memory voterHash) public
    {
        // require(Store(store).voterExist(voterHash));
       require(store.callVoterExist(voterHash));
        require(pollList[voterHash]==0);
        pollList[voterHash]++;
        options[option]++;
    }
    
}