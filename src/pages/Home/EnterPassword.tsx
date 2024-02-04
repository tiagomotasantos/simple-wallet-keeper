import { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { WalletKeeper } from "../../models";
import { ROUTE } from "../../routes";
import { loadingSelector, walletsSelector } from "../../store";
import { updateLoading, updateUser } from "../../store/walletKeeperSlice";

const EnterPassword = () => {
  const wallets = useSelector(walletsSelector);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      dispatch(updateLoading(true));

      const isAuthorized = await WalletKeeper.verifyUserPassword(
        formData.password,
        wallets
      );

      if (isAuthorized) {
        dispatch(updateUser({ password: formData.password }));
        navigate(ROUTE.WALLETS);
      } else {
        setError("Invalid password");
      }

      dispatch(updateLoading(false));
    },
    [formData.password, wallets, dispatch, navigate, setError]
  );

  return (
    <div>
      <h4>Enter password</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
        />
        <input type="submit" value="Unlock" disabled={loading} />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EnterPassword;
