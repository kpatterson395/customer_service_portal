import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVehicleSub,
  addVehicleSub,
  editVehicleSub,
} from "./redux/userData";
import "./styles/vehicleSubs.css";
import TransferModal from "./TransferModal";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import Tooltip from "@mui/material/Tooltip";

const VehicleSubs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [showAdd, setShowAdd] = useState(false);
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newLicense, setNewLicense] = useState("");
  const [editVehicle, setEditVehicle] = useState({});
  const [open, setOpen] = useState(false);
  const [transferVehicle, setTransferVehicle] = useState();

  const handleOpen = (id) => {
    setTransferVehicle(id);
    setOpen(true);
  };

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
    setShowAdd(false);
    setNewMake("");
    setNewModel("");
    setNewLicense("");
  };

  const handleSubmitChanges = () => {
    dispatch(editVehicleSub({ userId: id, editVehicle }));
    setEditVehicle({});
  };

  const returnEditable = () => {
    return (
      <TableRow key={editVehicle.id}>
        <TableCell>
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Car make"
            value={editVehicle.make}
            onChange={(e) =>
              setEditVehicle({ ...editVehicle, make: e.target.value })
            }
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Car Model"
            value={editVehicle.model}
            onChange={(e) =>
              setEditVehicle({ ...editVehicle, model: e.target.value })
            }
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Car Model"
            value={editVehicle.licensePlateNo}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                licensePlateNo: e.target.value,
              })
            }
          />
        </TableCell>
        <TableCell>
          <Button onClick={handleSubmitChanges}>Submit Changes</Button>
          <Button color="error" onClick={() => setEditVehicle({})}>
            Cancel
          </Button>
        </TableCell>
      </TableRow>
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
            {user.vehicle_subs &&
              user.vehicle_subs.map((v) => {
                if (v.id === editVehicle.id) {
                  return returnEditable();
                }
                return (
                  <TableRow key={v.id}>
                    <TableCell>{v.make}</TableCell>
                    <TableCell align="right">{v.model}</TableCell>
                    <TableCell align="right">{v.licensePlateNo}</TableCell>
                    <TableCell>
                      <Tooltip title="Transfer Vehicle">
                        <MoveDownIcon
                          className="clickable"
                          onClick={() => handleOpen(v.id)}
                        />
                      </Tooltip>

                      <Tooltip title="Edit">
                        <EditIcon
                          className="clickable"
                          onClick={() => setEditVehicle(v)}
                        />
                      </Tooltip>

                      <Tooltip title="Delete">
                        <DeleteIcon
                          className="clickable"
                          onClick={() =>
                            dispatch(
                              deleteVehicleSub({
                                userId: id,
                                vehicleId: v.id,
                              })
                            )
                          }
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
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
      <TransferModal
        open={open}
        setOpen={setOpen}
        currentUser={id}
        vehicleId={transferVehicle}
      />
    </div>
  );
};

export default VehicleSubs;
