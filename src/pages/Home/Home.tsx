import { useSelector } from "react-redux";
import { walletsSelector } from "../../store";
import CreatePassword from "./CreatePassword";
import EnterPassword from "./EnterPassword";

const Home = () => {
  const wallets = useSelector(walletsSelector);

  return wallets.length ? <EnterPassword /> : <CreatePassword />;
};

export default Home;
