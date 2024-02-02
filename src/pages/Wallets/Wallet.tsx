import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet as WalletModel } from "../../models";
import WalletFactory, { NetworkProvider } from "../../factory/WalletFactory";

interface WalletProps {
  wallet: WalletModel;
  provider: NetworkProvider;
}

const Wallet: FC<WalletProps> = ({ wallet, provider }) => {
  const [balance, setBalance] = useState("");
  const getBalance = async () => {
    try {
      const walletFactory = new WalletFactory(null);
      const b = await provider.getBalance(wallet.address);

      setBalance(walletFactory.formatBalance(b));
    } catch (error) {
      // failed to load balance
      console.log(error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [provider]);

  return (
    <div>
      <p>
        {wallet.name} | Balance: {balance ? `${balance} ETH` : "Loading..."}
      </p>
      <p>{wallet.address}</p>
      <Link to={`/wallet/${wallet.address}/private-key`}>Show private key</Link>
    </div>
  );
};

export default Wallet;
