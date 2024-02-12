import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState();
  const [totalGasUsed, setTotalGasUsed] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getTransactions() {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);

      setTotalGasUsed(block.gasUsed.toNumber());
      setTransactions(block.transactions);
    }

    getTransactions();
  }, [blockNumber]);

  return (
    <div className="App">
      <h1>Latest Block Number: {blockNumber}</h1>
      <h2>Transaction hashes from the block</h2>
      <h3>Total gas used: {totalGasUsed}</h3>

      <ol>
        {transactions?.map((tx, index) => (
          <li key={index}>{tx.hash}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
