import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { capitalizeFirst } from "./helpers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddFormRow = ({ formType, items, handleSubmit, setShowAdd, showAdd }) => {
  let keys = Object.keys(items);

  const errorCheck = () => {
    let valid = keys.every(
      (key) => items[key].value && items[key].value.length > 1
    );
    if (valid) {
      handleSubmit();
    }
  };

  const statusSelect = (key) => {
    return (
      <TableCell key={key} align="right">
        <Select
          size="small"
          aria-label="transaction status"
          id="status-select"
          value={items[key].value}
          label="Status"
          error={items[key].value.length < 1}
          onChange={(e) => items[key].fn(e.target.value)}
          helperText={
            items[key].value.length < 1 && "This is a required field."
          }
        >
          <MenuItem aria-label="status-option" value="pending">
            Pending
          </MenuItem>
          <MenuItem aria-label="status-option" value="paid">
            Paid
          </MenuItem>
          <MenuItem aria-label="status-option" value="credit">
            Credit
          </MenuItem>
        </Select>
      </TableCell>
    );
  };

  return (
    <TableRow>
      {keys.map((key) => {
        let type = "text";
        if (key === "amount") type = "number";
        if (key === "date") type = "date";
        if (key === "status") {
          return statusSelect(key);
        }
        return (
          <TableCell key={key} align="right">
            <TextField
              size="small"
              id="outlined-required"
              type={type}
              label={key !== "date" && capitalizeFirst(key)}
              value={items[key].value}
              error={!items[key].value}
              onChange={(e) => items[key].fn(e.target.value)}
              helperText={!items[key].value && "This is a required field."}
            />
          </TableCell>
        );
      })}

      <TableCell>
        <Button onClick={errorCheck}>Add {formType}</Button>
        <Button color="error" onClick={() => setShowAdd(!showAdd)}>
          Exit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AddFormRow;
