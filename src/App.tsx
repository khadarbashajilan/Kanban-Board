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
  // Define the routes for the application
  const routes = [
    // Each route has a path and an element to render
    {
      path: "/",
      // The errorElement is used to render a component when an error occurs
      element: <Layout />,
      errorElement: <NotFoundPage />,
      // The children array contains nested routes
      children: [
        // The first route is the root path which renders the Layout component
        {
          path: "/",
          element: <BoardsList />,
        },
        // The second route is for the boards list
        {
          path: "/boards",
          element: <BoardsList />,
        },
        // The third route is for board details which includes a dynamic boardId parameter
        {
          path: "/boards/:boardId",
          element: <BoardDetails />,
        },
        // The fourth route is for card details which includes a dynamic cardId parameter
        {
          path: "/boards/:boardId/card/:cardId",
          element: <CardDetails />,
        },
      ],
    },
  ];
  
  // Create a browser router with the defined routes
  const router = createBrowserRouter(routes);

  return (
    // and wrap the application with the Redux Provider
    // to connect the Redux store to the React application.
    // This allows the application to access the Redux store
    // and dispatch actions to manage the state of the application.
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // The Provider component makes the Redux store available
  // to all components in the application, allowing them
  // to connect to the store and access the state or dispatch actions.
  // The RouterProvider component is used to provide the router
);
}

export default App;
