import Layout from "./layouts/Layout";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import BoardsList from "./pages/BoardsList";
import BoardDetails from "./pages/BoardDetails";
import CardDetails from "./pages/CardDetails";
import { Provider } from "react-redux";
import { store } from "./store/config";

function App() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <BoardsList/>,
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

  return (

    <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
  )
}

export default App;
