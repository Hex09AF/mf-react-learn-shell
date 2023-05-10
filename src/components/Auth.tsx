import React, { useEffect, useRef } from "react";
import { mount } from "auth/AuthIndex";
import { AuthRoutingPrefix } from "../routing/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "react-redux";

const app1Basename = `/${AuthRoutingPrefix}`;

export default () => {
  const store = useStore();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to navigation events dispatched inside app1 mfe.
  useEffect(() => {
    const app1NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${app1Basename}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener("[app2] navigated", app1NavigationEventHandler);

    return () => {
      window.removeEventListener(
        "[app2] navigated",
        app1NavigationEventHandler
      );
    };
  }, [location]);

  // Listen for shell location changes and dispatch a notification.
  useEffect(() => {
    if (location.pathname.startsWith(app1Basename)) {
      window.dispatchEvent(
        new CustomEvent("[shell] navigated", {
          detail: location.pathname.replace(app1Basename, ""),
        })
      );
    }
  }, [location]);

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef(() => {});
  // Mount app1 MFE
  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }
    unmountRef.current = mount({
      mountPoint: wrapperRef.current!,
      initialPathname: location.pathname.replace(app1Basename, ""),
      store,
    });
    isFirstRunRef.current = false;
  }, [location]);

  useEffect(() => unmountRef.current, []);

  return <div ref={wrapperRef} id="app2-mfe" />;
};
