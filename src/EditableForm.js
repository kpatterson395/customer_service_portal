import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { capitalizeFirst } from "./helpers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const EditableForm = ({ editItems, setEditItems, handleSubmitChanges }) => {
  let items = Object.keys(editItems).filter((x) => x !== "id");

  const errorCheck = () => {
    console.log(items, editItems);
    let err = items.some((item) => editItems[item].length < 0);
    if (!err) {
      handleSubmitChanges();
    }
  };

  const statusSelect = (item) => {
    return (
      <TableCell key={item} align="right">
        <Select
          size="small"
          aria-label="transaction status"
          labelId="status-select-label"
          id="status-select"
          value={editItems[item]}
          label="status"
          error={editItems[item].length < 1}
          onChange={(e) =>
            setEditItems({ ...editItems, [item]: e.target.value })
          }
        >
          <MenuItem aria-label="status-option" value="pending">
            Pending
          </MenuItem>
          <MenuItem aria-label="status-option" value="paid">
            Paid
          </MenuItem>
        </Select>
      </TableCell>
    );
  };

  return (
    <TableRow key={editItems.id}>
      {items.map((item) => {
        let type = "text";
        if (item === "amount") type = "number";
        if (item === "date") type = "date";
        if (item === "status") {
          return statusSelect(item);
        }
        return (
          <TableCell key={item} align="right">
            <TextField
              size="small"
              id="outlined-required"
              type={type}
              label={capitalizeFirst(item)}
              value={editItems[item]}
              error={editItems[item].length < 1}
              disabled={item === "amount"}
              onChange={(e) =>
                setEditItems({ ...editItems, [item]: e.target.value })
              }
              helperText={
                editItems[item].length < 1 && "This is a required field."
              }
            />
          </TableCell>
        );
      })}

      <TableCell>
        <Button onClick={errorCheck}>Submit Changes</Button>
        <Button color="error" onClick={() => setEditItems({})}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableForm;
