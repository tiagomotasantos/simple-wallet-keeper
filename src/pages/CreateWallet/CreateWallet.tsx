import { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { ROUTE } from "../../routes";
import { loadingSelector, userSelector, walletsSelector } from "../../store";
import { createWallet, updateLoading } from "../../store/walletKeeperSlice";
import { WalletKeeper } from "../../models";

const CreateWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const wallets = useSelector(walletsSelector);
  const loading = useSelector(loadingSelector);
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
            dispatch(updateLoading(true));

            const wallet = await WalletKeeper.createWallet(formData.name, user);

            dispatch(createWallet(wallet));
            nextRoute = ROUTE.WALLETS;
          }

          navigate(nextRoute);
        }
      } catch (error) {
        setError("Failed to create wallet");
      } finally {
        dispatch(updateLoading(false));
      }
    },
    [formData.name, user, dispatch, navigate, setError, validate]
  );

  return (
    <div>
      <Link to={ROUTE.WALLETS}>Go back</Link>
      <h4>Create wallet</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Wallet name</label>
        <input
          type="text"
          id="name"
          data-testid="name"
          name="name"
          defaultValue={formData.name}
          onChange={onChange}
        />
        <input
          data-testid="create"
          type="submit"
          value="Create wallet"
          disabled={loading}
        />
      </form>
      {error && <p data-testid="create-error">{error}</p>}
    </div>
  );
};

export default CreateWallet;
