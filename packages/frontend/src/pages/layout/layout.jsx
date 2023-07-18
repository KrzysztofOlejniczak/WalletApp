import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import Loader from "../../components/loader/loader";
import css from "./layout.module.css";

export const Layout = () => {
  return (
    <div className={css.wrapper}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
