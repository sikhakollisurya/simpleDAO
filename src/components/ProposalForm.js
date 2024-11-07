import { useState } from 'react';

const ProposalForm = ({ submitProposal }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProposal(description);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter proposal description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Submit Proposal</button>
    </form>
  );
};

export default ProposalForm;
