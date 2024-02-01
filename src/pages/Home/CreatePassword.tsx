import { FormEvent } from "react";
import { useForm } from "../../hooks";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/walletKeeperSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes";

const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    newPassword: "",
    confirmPassword: "",
  });
  const validate = () => {
    if (formData.newPassword.length < 8) {
      return "Password length should be 8 characters or more";
    } else if (formData.newPassword !== formData.confirmPassword) {
      return "Passwords don't match";
    }

    return "";
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const error = validate();

    if (error) {
      setError(error);
    } else {
      dispatch(createUser({ password: formData.newPassword }));
      navigate(ROUTE.WALLETS);
    }
  };

  return (
    <div>
      <h4>Create password</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New password (min 8 chars)</label>
        <input
          type="newPassword"
          id="newPassword"
          name="newPassword"
          onChange={onChange}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="confirmPassword"
          id="confirmPassword"
          name="confirmPassword"
          onChange={onChange}
        />
        <input type="submit" value="Create password" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreatePassword;
