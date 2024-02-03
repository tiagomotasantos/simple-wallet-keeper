import { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { ROUTE } from "../../routes";
import { userSelector, walletsSelector } from "../../store";
import { createWallet } from "../../store/walletKeeperSlice";
import { WalletKeeper } from "../../models";

const CreateWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const wallets = useSelector(walletsSelector);
  const { formData, error, onChange, setError } = useForm({
    name: `Wallet ${wallets.length + 1}`,
  });
  const validate = useCallback(() => {
    if (!formData.name) {
      return "Wallet name is required";
    }

    return "";
  }, [formData]);
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const error = validate();
        let nextRoute = ROUTE.HOME;

        if (error) {
          setError(error);
        } else {
          if (user) {
            const wallet = await WalletKeeper.createWallet(formData.name, user);

            dispatch(createWallet(wallet));
            nextRoute = ROUTE.WALLETS;
          }

          navigate(nextRoute);
        }
      } catch (error) {
        setError("Failed to create wallet");
      }
    },
    [formData.name, user, dispatch, navigate, setError, validate]
  );

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
