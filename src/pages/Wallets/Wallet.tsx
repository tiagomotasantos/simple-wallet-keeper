import { FC } from "react";
import { Link } from "react-router-dom";
import { Wallet as WalletModel } from "../../models";

interface WalletProps {
  wallet: WalletModel;
}

const Wallet: FC<WalletProps> = ({ wallet }) => (
  <div>
    <p>
      {wallet.name} {wallet.balance}
    </p>
    <p>{wallet.address}</p>
    <Link to={`/wallet/${wallet.address}/private-key`}>Show private key</Link>
  </div>
);

export default Wallet;
