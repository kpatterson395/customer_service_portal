import "./App.css";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="users">
        <Route index element={<UserList />} />
        <Route path=":id" element={<UserDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
