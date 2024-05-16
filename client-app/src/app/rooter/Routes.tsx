import {  Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import NewsDashboard from "../../features/news/dashboard/NewsDashboard";
import NewsForm from "../../features/news/form/NewsForm";
import NewsDetails from "../../features/news/details/NewsDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     element: <RequireAuth />,
    children: [
      { path: "", element: <NewsDashboard /> },
      { path: "news/:id", element: <NewsDetails /> },
      { path: "createNews", element: <NewsForm key='create'/> },
      { path: "manage/:id", element: <NewsForm key='manage'/> },
      //       { path: "manage/:id", element: <ActivityForm key="manage" /> },
      //       { path: "profiles/:userName", element: <ProfilePage /> },
      { path: "errors", element: <TestErrors /> },
      //     ],
      //   },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
