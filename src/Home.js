import "./styles/Home.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useState } from "react";

const data = {
  cancel:
    "To cancel an account, first find the user in the user list and click on the approriate user to be taken to their account overview page. Within the account overview page, select account information, and select delete user.",
  recent_purchase:
    "To see recent purchases for a user, select the user from the user list and continue to their account overview page. From here, select purchase history from the menu. Here you can see a list of recent purchases, and make changes to recent purchses in event of error.",
  vehicle_sub:
    "To transfer a vehicle subscription, select the user from the user list and continue to their account overview page. From here, select the vehicle subscription option from the menu. Here you will see a list of vehicles subscribed to this user, and you can select the first icon to the right of each vehicle to transfer a vehicle to another registered user.",
};

const Home = () => {
  const [showData, setShowData] = useState("");

  return (
    <div>
      <div className="homeHero">
        <h1>Welcome to the Customer Service Representative Portal</h1>
      </div>

      <div>
        <h2>FAQ</h2>
        <Stack direction="row" spacing={1}>
          <Chip label="Find a user" component={Link} to="/userlist" clickable />
          <Chip
            label="How do I cancel a user?"
            onClick={() => setShowData("cancel")}
            variant="outlined"
            clickable
          />
          <Chip
            label="How do I see a recent purchase?"
            onClick={() => setShowData("recent_purchase")}
            variant="outlined"
            clickable
          />
          <Chip
            label="How do I transfer a vehicle to a different user?"
            onClick={() => setShowData("vehicle_sub")}
            variant="outlined"
            clickable
          />
        </Stack>
        <div className="showData">{showData && data[showData]}</div>
      </div>
    </div>
  );
};

export default Home;
