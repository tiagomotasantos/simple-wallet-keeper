import { useSelector } from "react-redux";
import { walletsSelector } from "../../store";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";
import { ROUTE } from "../../routes";

const Wallets = () => {
  const wallets = useSelector(walletsSelector);

  return (
    <div>
      <Link to={ROUTE.CREATE_WALLET}>Create wallet</Link>
      {wallets.map((wallet, i) => (
        <Wallet key={`wallet-${i}`} wallet={wallet} />
      ))}
    </div>
  );
};

export default Wallets;
