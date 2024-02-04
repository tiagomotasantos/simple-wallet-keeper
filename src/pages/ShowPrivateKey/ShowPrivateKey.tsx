import { FormEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { ROUTE } from "../../routes";
import { userSelector, walletSelector } from "../../store";
import { WalletKeeper } from "../../models";

const ShowPrivateKey = () => {
  const { address = "" } = useParams();
  const user = useSelector(userSelector);
  const wallet = useSelector(walletSelector(address));
  const [privateKey, setPrivateKey] = useState("");
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (wallet && user) {
        try {
          const privateKey = await WalletKeeper.getPrivateKeyFromWallet(
            wallet,
            formData.password
          );

          setPrivateKey(privateKey);
        } catch (error) {
          setError("Wrong password");
        }
      }
    },
    [formData.password, user, wallet, setError]
  );

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  return (
    <div>
      <Link to={ROUTE.WALLETS}>Go back</Link>
      <h4>Show private key for {wallet.name}</h4>

      {privateKey ? (
        <textarea
          id="privateKey"
          name="privateKey"
          data-testid="privateKey"
          value={privateKey}
          readOnly
        />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              data-testid="password"
              onChange={onChange}
            />
            <input data-testid="showPrivateKey" type="submit" value="Show" />
          </form>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default ShowPrivateKey;
