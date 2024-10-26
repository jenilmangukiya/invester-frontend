import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SignIn } from "../modules/SignIn";
import Dashboard from "../modules/Dashboard/Dashboard";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { Layout } from "../components";
import { AddInvester } from "../modules/AddInvester";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Layout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addInvester" element={<AddInvester />}></Route>
        </Route>

        <Route
          path="/sign-in"
          element={
            <PublicRoutes>
              <SignIn />
            </PublicRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
