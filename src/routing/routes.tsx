import React, { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";
import { DashboardRoutingPrefix, AuthRoutingPrefix } from "./constants";

const Dashboard = lazy(() =>
  import("../components/Dashboard").then((x) => {
    return x;
  })
);
const Auth = lazy(() =>
  import("../components/Auth").then((x) => {
    return x;
  })
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${DashboardRoutingPrefix}`} />,
      },
      {
        path: `/${DashboardRoutingPrefix}/*`,
        element: (
          <Suspense fallback="Loading Dashboard...">
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: `/${AuthRoutingPrefix}/*`,
        element: (
          <Suspense fallback="Loading Auth...">
            <Auth />
          </Suspense>
        ),
      },
    ],
  },
];
