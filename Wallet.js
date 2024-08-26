import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";

// Ganache local network configuration
const networks = {
  ganache: {
    chainId: `0x${Number(1337).toString(16)}`, // Default Ganache chain ID
    chainName: "Ganache Local Network",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545"], // Default Ganache RPC URL
    blockExplorerUrls: [], // Ganache does not have a block explorer
  },
};

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Check if the connected network is Ganache
    const { chainId } = await provider.getNetwork();
    if (chainId !== 1337) { // 1337 is the default chain ID for Ganache
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["ganache"],
          },
        ],
      });
    }

    const account = provider.getSigner();
    const Address = await account.getAddress();
    setAddress(Address);
    const Balance = ethers.utils.formatEther(await account.getBalance());
    setBalance(Balance);
  };

  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      {balance === '' ? <Balance></Balance> : <Balance>{balance.slice(0, 4)} ETH</Balance>}
      {address === '' ? <Address>Connect Wallet</Address> : <Address>{address.slice(0, 6)}...{address.slice(39)}</Address>}
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
`;

const Address = styled.h2`
  background-color: ${(props) => props.theme.bgSubDiv};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px 0 5px;
  border-radius: 10px;
`;

const Balance = styled.h2`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

export default Wallet;
