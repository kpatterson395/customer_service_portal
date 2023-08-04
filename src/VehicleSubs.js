import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicleSub, addVehicleSub } from "./redux/userData";
import "./styles/vehicleSubs.css";
import { useState } from "react";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const VehicleSubs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [showAdd, setShowAdd] = useState(false);
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newLicense, setNewLicense] = useState("");

  const handleSubmit = () => {
    dispatch(
      addVehicleSub({
        userId: id,
        newVehicle: {
          make: newMake,
          model: newModel,
          licensePlateNo: newLicense,
        },
      })
    );
  };

  return (
    <div>
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
                  <PeopleAltIcon className="clickable" />
                  <EditIcon className="clickable" />
                  <DeleteIcon
                    className="clickable"
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
            {showAdd && (
              <TableRow>
                <TableCell>
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Car make"
                    value={newMake}
                    onChange={(e) => setNewMake(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Car Model"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Car License"
                    value={newLicense}
                    onChange={(e) => setNewLicense(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={handleSubmit}>Add Vehicle</Button>
                  <Button color="error" onClick={() => setShowAdd(!showAdd)}>
                    Exit
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="clickable plus">
        {!showAdd && (
          <AddCircleOutlineIcon onClick={() => setShowAdd(!showAdd)} />
        )}
      </div>
    </div>
  );
};

export default VehicleSubs;
