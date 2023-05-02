import React from "react";
import { Link, Outlet } from "react-router-dom";
import { DashboardRoutingPrefix, AuthRoutingPrefix } from "../routing/constants";

export function Layout() {
  return (
    <>
      <nav style={{ marginBottom: "3rem" }}>
        <Link
          to={`/${DashboardRoutingPrefix}/page-1`}
          style={{ marginRight: "1rem" }}
        >
          App1 Page1
        </Link>
        <Link
          to={`/${DashboardRoutingPrefix}/page-2`}
          style={{ marginRight: "1rem" }}
        >
          App1 Page2
        </Link>
        <Link
          to={`/${AuthRoutingPrefix}/page-a`}
          style={{ marginRight: "1rem" }}
        >
          App2 PageA
        </Link>
        <Link to={`/${AuthRoutingPrefix}/page-b`}>App2 PageB</Link>
      </nav>

      <Outlet />
    </>
  );
}
