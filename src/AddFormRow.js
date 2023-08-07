import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { capitalizeFirst } from "./helpers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const AddFormRow = ({
  formType,
  items,
  handleSubmit,

  handleCancelAdd,
}) => {
  let keys = Object.keys(items);

  const errorCheck = () => {
    let valid = keys.every(
      (key) => items[key].value && items[key].value.length > 0
    );
    if (valid) {
      handleSubmit();
    }
  };

  const statusSelect = (key) => {
    return (
      <TableCell key={key} align="right">
        <FormControl>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            size="small"
            aria-label="transaction status"
            id="status-select"
            labelId="status-select-label"
            value={items[key].value}
            label="Status"
            error={items[key].value.length < 1}
            onChange={(e) => items[key].fn(e.target.value)}
          >
            <MenuItem aria-label="status-option" value="pending">
              Pending
            </MenuItem>
            <MenuItem aria-label="status-option" value="paid">
              Paid
            </MenuItem>
            \
          </Select>
        </FormControl>
      </TableCell>
    );
  };

  return (
    <TableRow>
      {keys.map((key, i) => {
        let type = "text";
        if (key === "amount") type = "number";
        if (key === "date") type = "date";
        if (key === "status") {
          return statusSelect(key);
        }
        let align = i !== 0 ? "right" : "inherit";

        return (
          <TableCell key={key} align={align}>
            <TextField
              size="small"
              id="outlined-required"
              type={type}
              required
              label={capitalizeFirst(key)}
              value={items[key].value}
              error={!items[key].value}
              onChange={(e) => items[key].fn(e.target.value)}
              // helperText={!items[key].value && "This is a required field."}
            />
          </TableCell>
        );
      })}

      <TableCell>
        <Button onClick={errorCheck}>Add {formType}</Button>
        <Button color="error" onClick={handleCancelAdd}>
          Exit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AddFormRow;
