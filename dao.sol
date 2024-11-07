// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnhancedDAO {
    address public owner;

    // Struct to represent a proposal
    struct Proposal {
        string description;
        uint voteCount;
        bool exists;
        mapping(address => bool) voted;
    }

    // Array to store proposals
    Proposal[] public proposals;

    // Event emitted when a new proposal is submitted
    event ProposalSubmitted(uint proposalId, string description);

    // Event emitted when a vote is cast
    event VoteCast(uint proposalId, address voter);

    constructor() {
        owner = msg.sender;
    }

    // Function to submit a proposal
    function submitProposal(string memory description) public {
        proposals.push();
        Proposal storage newProposal = proposals[proposals.length - 1];
        newProposal.description = description;
        newProposal.exists = true;
        emit ProposalSubmitted(proposals.length - 1, description);
    }

    // Function to vote on a proposal
    function voteOnProposal(uint proposalId) public {
        require(proposals[proposalId].exists, "Proposal does not exist");
        require(!proposals[proposalId].voted[msg.sender], "You have already voted on this proposal");

        proposals[proposalId].voteCount++;
        proposals[proposalId].voted[msg.sender] = true;

        emit VoteCast(proposalId, msg.sender);
    }

    // Function to get the details of a proposal (description and vote count)
    function getProposal(uint proposalId) public view returns (string memory description, uint voteCount) {
        require(proposals[proposalId].exists, "Proposal does not exist");
        return (proposals[proposalId].description, proposals[proposalId].voteCount);
    }

    // Function to return the total number of proposals
    function getTotalProposals() public view returns (uint) {
        return proposals.length;
    }
}
