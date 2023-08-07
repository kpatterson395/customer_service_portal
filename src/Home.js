import "./styles/Home.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const data = {
  cancel:
    "To cancel an account, first find the user in the user list and click on the approriate user to be taken to their account overview page. Within the account overview page, select account information, and select delete user.",
  recent_purchase:
    "To see recent purchases for a user, select the user from the user list and continue to their account overview page. From here, select purchase history from the menu. Here you can see a list of recent purchases, and make changes to recent purchses in event of error.",
  vehicle_sub:
    "To transfer a vehicle subscription, select the user from the user list and continue to their account overview page. From here, select the vehicle subscription option from the menu. Here you will see a list of vehicles subscribed to this user, and you can select the first icon to the right of each vehicle to transfer a vehicle to another registered user.",
  balance:
    "The balance for a user is displayed on the Account Details page, after you have selected a user from the user list. If the balance is negative, the user has money credited to their acount. If the balance is positive, the user owes money on their account. To see further details on payments and charges made, visit the purchase history tab.",
  fix_balance:
    "If the balance for a user is in correct, you can delete an invalid transaction from their account. An outstanding balance comes from a pending charge, so to remove the balance, find the user from the user list, select the purchase history tab, and find the transaction you want to remove.",
};

const Home = () => {
  const [showData, setShowData] = useState("");

  return (
    <div>
      <div className="homeHero">
        <h1>Welcome to the Customer Service Representative Portal</h1>
        <p>
          Get started by{" "}
          <Link className="link" to="/userlist">
            finding a user
          </Link>
          , or check out some of the frequently asked questions below!
        </p>
      </div>
      <div className="faq-section">
        <h2>FAQ</h2>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
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
          <Chip
            label="How do I see if my user has a balance?"
            onClick={() => setShowData("balance")}
            variant="outlined"
            clickable
          />
          <Chip
            label="How do I fix an incorrect balance for a user?"
            onClick={() => setShowData("fix_balance")}
            variant="outlined"
            clickable
          />
        </Stack>
        {showData && (
          <Box className="faqOutput">
            <div className="showData">{showData && data[showData]}</div>
            <Button
              variant="text"
              color="error"
              onClick={() => setShowData("")}
            >
              Close
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Home;
