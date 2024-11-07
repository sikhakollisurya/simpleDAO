const ProposalList = ({ proposals, voteOnProposal }) => {
    return (
      <div>
        
        {proposals.map((proposal, index) => (
          <div key={index}>
            <p>{`Proposal ${index + 1}: ${proposal.description} | Votes: ${proposal.voteCount}`}</p>
            <button onClick={() => voteOnProposal(index)}>Vote</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProposalList;
  