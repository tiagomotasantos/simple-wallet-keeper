import { FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { WalletKeeper } from "../../models";
import { ROUTE } from "../../routes";
import { walletsSelector } from "../../store";
import { updateUser } from "../../store/walletKeeperSlice";

const EnterPassword = () => {
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const isAuthorized = await WalletKeeper.verifyUserPassword(
        formData.password,
        wallets
      );
      console.log("OI");

      if (isAuthorized) {
        dispatch(updateUser({ password: formData.password }));
        navigate(ROUTE.WALLETS);
      } else {
        setError("Invalid password");
      }
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
        <input type="submit" value="Unlock" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EnterPassword;
