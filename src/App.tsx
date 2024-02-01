import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTE } from "./routes";
import { Home } from "./pages/Home";

const Wallets = lazy(() => import("./pages/Wallets/Wallets"));
const CreateWallet = lazy(() => import("./pages/CreateWallet/CreateWallet"));
const ShowPrivateKey = lazy(
  () => import("./pages/ShowPrivateKey/ShowPrivateKey")
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTE.HOME} element={<Home />} />
          <Route path={ROUTE.WALLETS} element={<Wallets />} />
          <Route path={ROUTE.CREATE_WALLET} element={<CreateWallet />} />
          <Route path={ROUTE.PRIVATE_KEY} element={<ShowPrivateKey />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
