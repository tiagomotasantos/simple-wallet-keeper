import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE } from "./routes";
import { Home } from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const Wallets = lazy(() => import("../pages/Wallets/Wallets"));
const CreateWallet = lazy(() => import("../pages/CreateWallet/CreateWallet"));
const ShowPrivateKey = lazy(
  () => import("../pages/ShowPrivateKey/ShowPrivateKey")
);

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={ROUTE.HOME} element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTE.WALLETS} element={<Wallets />} />
          <Route path={ROUTE.CREATE_WALLET} element={<CreateWallet />} />
          <Route path={ROUTE.PRIVATE_KEY} element={<ShowPrivateKey />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
