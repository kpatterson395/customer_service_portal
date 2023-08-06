import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditableForm = ({ editVehicle, setEditVehicle, handleSubmitChanges }) => {
  return (
    <TableRow key={editVehicle.id}>
      <TableCell>
        <TextField
          required
          size="small"
          id="outlined-required"
          label="Car make"
          value={editVehicle.make}
          error={editVehicle.make.length < 1}
          onChange={(e) =>
            setEditVehicle({ ...editVehicle, make: e.target.value })
          }
          helperText={
            editVehicle.make.length < 1 && "This is a required field."
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
          error={editVehicle.model.length < 1}
          onChange={(e) =>
            setEditVehicle({ ...editVehicle, model: e.target.value })
          }
          helperText={
            editVehicle.model.length < 1 && "This is a required field."
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
          error={editVehicle.licensePlateNo.length < 1}
          onChange={(e) =>
            setEditVehicle({
              ...editVehicle,
              licensePlateNo: e.target.value,
            })
          }
          helperText={
            editVehicle.licensePlateNo.length < 1 && "This is a required field."
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

export default EditableForm;
