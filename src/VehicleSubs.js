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
import DeleteConfirm from "./DeleteConfirm";
import EditableForm from "./EditableForm";
import AddFormRow from "./AddFormRow";

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
  const [deleteId, setDeleteId] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    dispatch(
      deleteVehicleSub({
        userId: id,
        vehicleId: deleteId,
      })
    );
    setDeleteId();
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleTransferOpen = (id) => {
    setTransferVehicle(id);
    setOpen(true);
  };

  const handleSubmit = () => {
    if (newMake && newModel && newLicense) {
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
    }
  };

  const handleSubmitChanges = () => {
    if (editVehicle.make && editVehicle.model && editVehicle.licensePlateNo) {
      dispatch(editVehicleSub({ userId: id, editVehicle }));
      setEditVehicle({});
    }
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
                  return (
                    <EditableForm
                      key={v.id}
                      editVehicle={editVehicle}
                      setEditVehicle={setEditVehicle}
                      handleSubmitChanges={handleSubmitChanges}
                    />
                  );
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
                          onClick={() => handleTransferOpen(v.id)}
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
                          onClick={() => {
                            setDeleteId(v.id);
                            handleDeleteOpen();
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {showAdd && (
              <AddFormRow
                newMake={newMake}
                setNewMake={setNewMake}
                newModel={newModel}
                setNewModel={setNewModel}
                newLicense={newLicense}
                setNewLicense={setNewLicense}
                handleSubmit={handleSubmit}
                setShowAdd={setShowAdd}
                showAdd={showAdd}
              />
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
      <DeleteConfirm
        open={deleteOpen}
        onClose={handleDeleteClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default VehicleSubs;
