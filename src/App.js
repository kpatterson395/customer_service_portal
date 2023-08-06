import "./styles/App.css";
import UserList from "./UserList";
import Home from "./Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
  Link,
} from "react-router-dom";
import UserDetails from "./UserDetails";
import RootLayout from "./Layouts/RootLayout";
import NotFound from "./NotFound";
import EditUser from "./EditUser";
import VehicleSubs from "./VehicleSubs";
import PurchaseHistory from "./PurchaseHistory";
import AddUser from "./AddUser";
import UsersLayout from "./Layouts/UsersLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="userlist"
        element={<UserList />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="addUser"
        element={<AddUser />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="users"
        element={<UsersLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route path="edit/:id" element={<EditUser />} />
        <Route path=":id" element={<UserDetails />} />
        <Route path="vehicles/:id" element={<VehicleSubs />} />
        <Route path="purchases/:id" element={<PurchaseHistory />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return (
    <div>
      Something went wrong! <Link to="/">Home</Link>
    </div>
  );
}

export default App;
