import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { NetworkProvider, Wallet as WalletModel } from "../../models";
import WalletKeeper from "../../models/WalletKeeper";
import "./Wallet.css";

interface WalletProps {
  wallet: WalletModel;
  provider: NetworkProvider;
}

const Wallet: FC<WalletProps> = ({ wallet, provider }) => {
  const [balance, setBalance] = useState("");
  const [balanceError, setBalanceError] = useState("");
  const getBalance = useCallback(async () => {
    try {
      const walletBalance = await provider.getBalance(wallet.address);

      setBalance(WalletKeeper.formatBalance(walletBalance));
    } catch (error) {
      setBalanceError("Failed to load");
    }
  }, [provider, wallet, setBalance]);

  useEffect(() => {
    getBalance();
  }, [provider, getBalance]);

  const Balance = useMemo(
    () => (
      <>
        Balance:{" "}
        {balanceError
          ? balanceError
          : balance
          ? `${balance} ETH`
          : "Loading..."}
      </>
    ),
    [balance, balanceError]
  );

  return (
    <div data-testid="wallet" className="wallet">
      <p>
        {wallet.name} | {Balance}
      </p>
      <p>{wallet.address}</p>
      <Link to={`/wallet/${wallet.address}/private-key`}>Show private key</Link>
    </div>
  );
};

export default Wallet;
