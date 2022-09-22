import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppRoutes } from "router/router.constants";
import Employees from "ui/pages/Employees";
import Desks from "ui/pages/Desks";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.employees} element={<Employees />}></Route>
        <Route path={AppRoutes.desks} element={<Desks />}></Route>
        <Route
          path={AppRoutes.notFound}
          element={<Navigate replace to={AppRoutes.employees} />}
        ></Route>
      </Routes>
    </Router>
  );
};
