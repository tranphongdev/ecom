import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ConfigProvider } from "antd";
import { antdTheme } from "./theme";
import "./index.css";

export const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
