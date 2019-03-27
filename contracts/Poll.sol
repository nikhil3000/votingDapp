pragma solidity ^0.5.1;
import './Library/Lpoll.sol';


contract Poll {
    using Lpoll for address;
    string private question;
    mapping(string=>uint) pollList;
    //mapping(string=>uint) public options;
    string[] options;
    uint[] votes;
    uint i=0;
    
    address private store;
    
    constructor (string memory _question, address _store) public
    {
        question = _question;
        store = _store;
    }
    
    function addOptions(string memory option) public
    {
        options[i++] = option;
    }

    function getQuestion() view public returns (string memory) 
    {
        return question;
    }
    
    function getOptions(uint ind) view public returns (string memory)
    {
        return options[ind];
    }
    
    function vote(uint ind, string memory voterHash) public
    {
        // require(Store(store).voterExist(voterHash));
       require(store.callVoterExist(voterHash));
        require(pollList[voterHash]==0);
        pollList[voterHash]++;
       votes[ind]++;
    }
    
}