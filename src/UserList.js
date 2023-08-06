import { useSelector } from "react-redux";
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

import "./styles/UserList.css";

const UserList = () => {
  const { users } = useSelector((state) => state.userData);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="header">Last Name</TableCell>
              <TableCell className="header">First Name</TableCell>
              <TableCell className="header">User Id</TableCell>
              <TableCell className="header">{""}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                component={Link}
                to={`/users/${user.id}`}
                className="link"
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
                  <Button variant="text">See details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="add" className="addUser">
        <p>Add User</p>
        <AddCircleOutlineIcon />
      </Link>
    </div>
  );
};

export default UserList;
