import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import { Provider } from "react-redux";
import store from "./store";
import Students from "./features/students/Students";
import StudentDetails from "./features/students/StudentDetails";
import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Students /> },
      { path: "/students", element: <Students /> },
      { path: "/students/:id", element: <StudentDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
