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

const UserList = () => {
  const { users } = useSelector((state) => state.userData);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>User Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                component={Link}
                to={user.id}
                className="link"
              >
                <TableCell component="th" scope="row">
                  {user.last}
                </TableCell>
                <TableCell>{user.first}</TableCell>
                <TableCell component="th" scope="row">
                  {user.id}
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
