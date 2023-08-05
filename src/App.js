import "./styles/App.css";
import UserList from "./UserList";
import Home from "./Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserDetails from "./UserDetails";
import RootLayout from "./RootLayout";
import NotFound from "./NotFound";
import EditUser from "./EditUser";
import VehicleSubs from "./VehicleSubs";
import PurchaseHistory from "./PurchaseHistory";
import AddUser from "./AddUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="users">
        <Route index element={<UserList />} />
        <Route path="add" element={<AddUser />} />
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

export default App;
