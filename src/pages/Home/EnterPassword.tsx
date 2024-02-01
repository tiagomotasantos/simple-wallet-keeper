import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";

const EnterPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, error, onChange, setError } = useForm({
    password: "",
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // const error = validate();

    // if (error) {
    //   setError(error);
    // } else {
    //   dispatch(createUser({ password: formData.newPassword }));
    //   //navigate(ROUTE.WALLETS);
    // }
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
