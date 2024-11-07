import './App.css';  // Ensure this is at the top to import the styles

import React, { useEffect, useState, useRef } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import contractABI from './abi/EnhancedDAO.json';

const contractAddress = '0x24a44C1757909B610929ce7630322222327ACcf5';  // Replace with your actual contract address

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const proposalListRef = useRef(null);  // Create a reference for the proposal list container

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const _provider = new BrowserProvider(window.ethereum);
        setProvider(_provider);

        const _signer = await _provider.getSigner();
        setSigner(_signer);

        const _contract = new Contract(contractAddress, contractABI, _signer);
        setContract(_contract);

        await fetchProposals(_contract);
      } else {
        console.log("Please install MetaMask!");
      }
    };

    initProvider();
  }, []);

  const fetchProposals = async (contract) => {
    const totalProposals = await contract.getTotalProposals();
    const _proposals = [];
    
    for (let i = 0; i < totalProposals; i++) {
      const proposal = await contract.getProposal(i);
  
      // Assuming proposal[1] is a BigNumber representing voteCount
      const voteCount = proposal[1].toNumber ? proposal[1].toNumber() : parseInt(proposal[1]);
  
      _proposals.push({
        description: proposal[0],
        voteCount: voteCount,
      });
    }
  
    setProposals(_proposals);

    // Scroll to the bottom after new proposals are fetched
    if (proposalListRef.current) {
      proposalListRef.current.scrollTop = proposalListRef.current.scrollHeight;
    }
  };

  const submitProposal = async (description) => {
    const tx = await contract.submitProposal(description);
    await tx.wait();
    await fetchProposals(contract);  // Fetch updated proposals
  };

  const voteOnProposal = async (proposalId) => {
    const tx = await contract.voteOnProposal(proposalId);
    await tx.wait();
    await fetchProposals(contract);  // Fetch updated proposals
  };

  return (
    <div className="app-container">
      <h1>Simple DAO</h1>
      
      <ProposalForm submitProposal={submitProposal} />
      <div className="proposals-section">
      <h2>Proposals</h2>
        <div className="proposal-list" ref={proposalListRef}> {/* Set the ref here */}
          <ProposalList proposals={proposals} voteOnProposal={voteOnProposal} />
        </div>
      </div>
    </div>
  );
};

export default App;
