import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddFormRow = ({
  newMake,
  setNewMake,
  newModel,
  setNewModel,
  newLicense,
  setNewLicense,
  handleSubmit,
  setShowAdd,
  showAdd,
}) => {
  return (
    <TableRow>
      <TableCell>
        <TextField
          required
          size="small"
          id="outlined-required"
          label="Car make"
          value={newMake}
          error={newMake.length < 1}
          onChange={(e) => setNewMake(e.target.value)}
          helperText={newMake.length < 1 && "This is a required field."}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          required
          size="small"
          id="outlined-required"
          label="Car Model"
          value={newModel}
          error={newModel.length < 1}
          onChange={(e) => setNewModel(e.target.value)}
          helperText={newModel.length < 1 && "This is a required field."}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          required
          size="small"
          id="outlined-required"
          label="Car License"
          value={newLicense}
          error={newLicense.length < 1}
          onChange={(e) => setNewLicense(e.target.value)}
          helperText={newLicense.length < 1 && "This is a required field."}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleSubmit}>Add Vehicle</Button>
        <Button color="error" onClick={() => setShowAdd(!showAdd)}>
          Exit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AddFormRow;
