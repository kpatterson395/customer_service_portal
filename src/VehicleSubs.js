import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicleSub } from "./redux/userData";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const VehicleSubs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Make</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">License Plate Number</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.vehicle_subs.map((v) => (
            <TableRow key={v.licensePlateNo}>
              <TableCell>{v.make}</TableCell>
              <TableCell align="right">{v.model}</TableCell>
              <TableCell align="right">{v.licensePlateNo}</TableCell>
              <TableCell>
                <PeopleAltIcon />
                <EditIcon />
                <DeleteIcon
                  onClick={() =>
                    dispatch(
                      deleteVehicleSub({
                        userId: id,
                        licensePlateNo: v.licensePlateNo,
                      })
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleSubs;
