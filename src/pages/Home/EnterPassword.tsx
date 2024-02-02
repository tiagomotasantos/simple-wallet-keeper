import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { WalletKeeper } from "../../models";
import { ROUTE } from "../../routes/routes";
import { walletsSelector } from "../../store";
import { updateUser } from "../../store/walletKeeperSlice";

const EnterPassword = () => {
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const isValidPassword = await WalletKeeper.verifyUserPassword(
      formData.password,
      wallets
    );

    if (isValidPassword) {
      dispatch(updateUser({ password: formData.password }));
      navigate(ROUTE.WALLETS);
    } else {
      setError("Invalid password");
    }
  };

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
