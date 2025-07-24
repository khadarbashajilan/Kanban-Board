import Layout from "./layouts/Layout";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <BoardsList />,
        },
        {
          path: "/boards",
          element: <BoardsList />,
        },
        {
          path: "/boards/:boardId",
          element: <BoardDetails />,
        },
        {
          path: "/boards/:boardId/card/:cardId",
          element: <CardDetails />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
