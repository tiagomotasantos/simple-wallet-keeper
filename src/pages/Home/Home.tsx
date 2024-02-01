import { useSelector } from "react-redux";
import { userSelector, walletsSelector } from "../../store";
import EnterPassword from "./EnterPassword";
import CreatePassword from "./CreatePassword";

const Home = () => {
  const user = useSelector(userSelector);
  const wallets = useSelector(walletsSelector);

  return user || wallets.length ? <EnterPassword /> : <CreatePassword />;
};

export default Home;
