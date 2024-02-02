import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { WalletFactory } from "../../factory";
import { useForm } from "../../hooks";
import { ROUTE } from "../../routes/routes";
import { userSelector, walletSelector } from "../../store";

const ShowPrivateKey = () => {
  const { address = "" } = useParams();
  const user = useSelector(userSelector);
  const wallet = useSelector(walletSelector(address));
  const [privateKey, setPrivateKey] = useState("");
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
        <textarea
          id="privateKey"
          name="privateKey"
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
