import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WalletFactory } from "../../factory";
import { useForm } from "../../hooks";
import { ROUTE } from "../../routes/routes";
import { userSelector, walletsSelector } from "../../store";
import { createWallet } from "../../store/walletKeeperSlice";

const CreateWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const wallets = useSelector(walletsSelector);
  const { formData, error, onChange, setError } = useForm({
    name: `Wallet ${wallets.length + 1}`,
  });
  const validate = () => {
    if (!formData.name) {
      return "Wallet name is required";
    }

    return "";
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const error = validate();

      if (error) {
        setError(error);
      } else {
        const walletFactory = new WalletFactory(user!);
        const wallet = await walletFactory.createWallet(formData.name);

        dispatch(createWallet(wallet));
        navigate(ROUTE.WALLETS);
      }
    } catch (error) {
      setError("Failed to create wallet");
    }
  };

  return (
    <div>
      <h5>Create wallet</h5>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Wallet name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={formData.name}
          onChange={onChange}
        />
        <input type="submit" value="Create wallet" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateWallet;
