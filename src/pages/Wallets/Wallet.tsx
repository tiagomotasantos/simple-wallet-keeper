import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet as WalletModel } from "../../models";
import WalletKeeper, { NetworkProvider } from "../../models/WalletKeeper";

interface WalletProps {
  wallet: WalletModel;
  provider: NetworkProvider;
}

const Wallet: FC<WalletProps> = ({ wallet, provider }) => {
  const [balance, setBalance] = useState("");
  const getBalance = useCallback(async () => {
    try {
      const walletBalance = await provider.getBalance(wallet.address);

      setBalance(WalletKeeper.formatBalance(walletBalance));
    } catch (error) {
      // failed to load balance
      console.log(error);
    }
  }, [provider, wallet, setBalance]);

  useEffect(() => {
    getBalance();
  }, [provider, getBalance]);

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
