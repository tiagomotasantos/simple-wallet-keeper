import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { WalletFactory } from "../../factory";
import { userSelector, walletsSelector } from "../../store";
import { createUser } from "../../store/walletKeeperSlice";
import { ROUTE } from "../../routes/routes";

const EnterPassword = () => {
  const user = useSelector(userSelector);
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const walletFactory = new WalletFactory(user!);
    const isValidPassword = await walletFactory.verifyUserPassword(
      formData.password,
      wallets
    );

    if (isValidPassword) {
      dispatch(createUser({ password: formData.password }));
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
