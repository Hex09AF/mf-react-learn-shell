import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { decrement, increment, selectCount } from "../app/store";
import {
  DashboardRoutingPrefix,
  AuthRoutingPrefix,
} from "../routing/constants";

export function Layout() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <>
      <nav style={{ marginBottom: "3rem" }}>
        {count}
        <button onClick={() => dispatch(increment())} type="button">
          Inc
        </button>
        <button onClick={() => dispatch(decrement())} type="button">
          Dev
        </button>

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
