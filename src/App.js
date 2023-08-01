import "./App.css";
import UserList from "./UserList";
import Home from "./Home";
import { v4 as uuidv4 } from "uuid";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserDetails from "./UserDetails";

const users = [
  {
    first: "Kristie",
    last: "Patterson",
    id: uuidv4(),
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="users">
        <Route index element={<UserList users={users} />} />
        <Route path=":id" element={<UserDetails />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
