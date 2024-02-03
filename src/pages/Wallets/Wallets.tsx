import { ChangeEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { WalletKeeper } from "../../models";
import { ROUTE } from "../../routes";
import { walletsSelector } from "../../store";
import Wallet from "./Wallet";
import NetworkSelect, { DEFAULT_NETWORK } from "./NetworkSelect";

const Wallets = () => {
  const [provider, setProvider] = useState(
    WalletKeeper.getProvider(DEFAULT_NETWORK)
  );
  const wallets = useSelector(walletsSelector);
  const onChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setProvider(WalletKeeper.getProvider(event.target.value));
    },
    [setProvider]
  );

  return (
    <div>
      <Link to={ROUTE.CREATE_WALLET}>Create wallet</Link>
      <NetworkSelect onChange={onChange} />
      {wallets.map((wallet, i) => (
        <Wallet key={`wallet-${i}`} wallet={wallet} provider={provider} />
      ))}
    </div>
  );
};

export default Wallets;
