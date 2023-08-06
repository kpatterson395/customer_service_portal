import { useSelector } from "react-redux";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./styles/UserList.css";

const UserList = () => {
  const { users } = useSelector((state) => state.userData);
  const [filterText, setFilterText] = useState("");

  const checkFilter = ({ first, last }) => {
    if (filterText.length < 1) {
      return true;
    } else if (
      first.toLowerCase().startsWith(filterText.toLowerCase()) ||
      last.toLowerCase().startsWith(filterText.toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="header">Last Name</TableCell>
              <TableCell className="header">First Name</TableCell>
              <TableCell className="header">User Id</TableCell>
              <TableCell className="header">
                <TextField
                  id="standard-basic"
                  label="Filter"
                  variant="standard"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              if (checkFilter(user)) {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={user.id}
                  >
                    <TableCell component="th" scope="row">
                      {user.last}
                    </TableCell>
                    <TableCell>{user.first}</TableCell>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        variant="text"
                        component={Link}
                        to={`/users/${user.id}`}
                        className="link"
                      >
                        See details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
              return "";
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/addUser" className="addUser">
        <p>Add User</p>
        <AddCircleOutlineIcon />
      </Link>
    </div>
  );
};

export default UserList;
