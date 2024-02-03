import { FormEvent, useCallback } from "react";
import { useForm } from "../../hooks";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/walletKeeperSlice";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes";

const MIN_CHARS = 8;

const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    newPassword: "",
    confirmPassword: "",
  });
  const validate = useCallback(() => {
    if (formData.newPassword.length < MIN_CHARS) {
      return `Password length should be ${MIN_CHARS} characters or more`;
    } else if (formData.newPassword !== formData.confirmPassword) {
      return "Passwords don't match";
    }

    return "";
  }, [formData]);
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const error = validate();

      if (error) {
        setError(error);
      } else {
        dispatch(updateUser({ password: formData.newPassword }));
        navigate(ROUTE.WALLETS);
      }
    },
    [formData.newPassword, dispatch, navigate, setError, validate]
  );

  return (
    <div>
      <h4>Create password</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">
          New password (min {MIN_CHARS} chars)
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={onChange}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
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
