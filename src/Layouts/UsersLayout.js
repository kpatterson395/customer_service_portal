import { Outlet, NavLink, useParams, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "../styles/UsersLayout.css";

export default function UsersLayout() {
  const params = useParams();
  const location = useLocation();

  const pathname = () => {
    if (location.pathname.startsWith("users/vehicles")) {
      return 1;
    } else if (location.pathname.startsWith("users/purchases")) {
      return 2;
    }
    return 0;
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs aria-label="user navigation tabs">
            <Tab
              label="Account Details"
              component={NavLink}
              to={`${params.id}`}
              disabled={!params.id}
              {...a11yProps(0)}
            />
            <Tab
              label="Vehicle Subscriptions"
              component={NavLink}
              to={`vehicles/${params.id}`}
              disabled={!params.id}
              {...a11yProps(1)}
            />
            <Tab
              label="Purchase History"
              component={NavLink}
              to={`purchases/${params.id}`}
              disabled={!params.id}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
