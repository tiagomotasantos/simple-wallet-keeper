import { FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { ROUTE } from "../../routes";
import { loadingSelector, userSelector, walletSelector } from "../../store";
import { WalletKeeper } from "../../models";
import { updateLoading } from "../../store/walletKeeperSlice";

const ShowPrivateKey = () => {
  const { address = "" } = useParams();
  const user = useSelector(userSelector);
  const wallet = useSelector(walletSelector(address));
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const [privateKey, setPrivateKey] = useState("");
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (wallet && user) {
        try {
          dispatch(updateLoading(true));

          const privateKey = await WalletKeeper.getPrivateKeyFromWallet(
            wallet,
            formData.password
          );

          setPrivateKey(privateKey);
        } catch (error) {
          setError("Wrong password");
        } finally {
          dispatch(updateLoading(false));
        }
      }
    },
    [formData.password, user, wallet, setError, dispatch]
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
            <input
              data-testid="showPrivateKey"
              type="submit"
              value="Show"
              disabled={loading}
            />
          </form>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default ShowPrivateKey;
