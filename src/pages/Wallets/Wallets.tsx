import { ChangeEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { WalletKeeper } from "../../models";
import { ROUTE } from "../../routes/routes";
import { walletsSelector } from "../../store";
import Wallet from "./Wallet";

const NETWORKS = [
  { label: "Goerli", value: "goerli" },
  { label: "Sepolia", value: "sepolia" },
];
const Wallets = () => {
  const [provider, setProvider] = useState(WalletKeeper.getProvider("goerli"));
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
      <div>
        <label htmlFor="network">Choose a testnet network:</label>
        <select
          name="network"
          id="network"
          defaultValue="goerli"
          onChange={onChange}
        >
          {NETWORKS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {wallets.map((wallet, i) => (
        <Wallet key={`wallet-${i}`} wallet={wallet} provider={provider} />
      ))}
    </div>
  );
};

export default Wallets;
