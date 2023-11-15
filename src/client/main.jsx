import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import Students from "./features/students/Students";
import StudentDetails from "./features/students/StudentDetails";
import NotFound from "./features/404/NotFound";
import Root from "./layout/Root.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", element: <Students /> },
      { path: "/students", element: <Students /> },
      { path: "/students/:id", element: <StudentDetails /> },
    ],
  },
  { path: "/*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
