import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { userSelector, walletSelector } from "../../store";
import { ROUTE } from "../../routes";
import { WalletFactory } from "../../factory";

const ShowPrivateKey = () => {
  const { address = "" } = useParams();
  const user = useSelector(userSelector);
  const wallet = useSelector(walletSelector(address));
  const [privateKey, setPrivateKey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (wallet && user) {
      try {
        const walletFactory = new WalletFactory(user);
        const privateKey =
          await walletFactory.createPrivateKeyFromEncryptedJson(
            wallet.privateKey,
            formData.password
          );

        setPrivateKey(privateKey);
      } catch (error) {
        setError("Wrong password");
      }
    }
  };

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  return (
    <div>
      <Link to={ROUTE.WALLETS}>Go back</Link>
      <h4>Show private key for {wallet.name}</h4>

      {privateKey ? (
        <textarea id="privateKey" name="privateKey" value={privateKey} />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChange}
            />
            <input type="submit" value="Show" />
          </form>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default ShowPrivateKey;
