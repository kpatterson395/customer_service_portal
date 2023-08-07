import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { capitalizeFirst } from "./helpers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const EditableForm = ({ editItems, setEditItems, handleSubmitChanges }) => {
  let items = Object.keys(editItems).filter((x) => x !== "id");

  const errorCheck = () => {
    let err = items.some((item) => editItems[item].length < 0);
    if (!err) {
      handleSubmitChanges();
    }
  };

  const statusSelect = (item) => {
    return (
      <TableCell key={item} align="right">
        <FormControl>
          <InputLabel id="status-select-label">Status</InputLabel>
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
        </FormControl>
      </TableCell>
    );
  };

  const convertDate = (date) => {
    let t = new Date(date);
    return t.toISOString().split("T")[0];
  };

  return (
    <TableRow key={editItems.id}>
      {items.map((item, i) => {
        let type = "text";
        let align = i !== 0 ? "right" : "inherit";
        if (item === "amount") type = "number";
        if (item === "date") type = "date";

        if (item === "status") {
          return statusSelect(item);
        }
        return (
          <TableCell key={item} align={align}>
            <TextField
              size="small"
              id="outlined-required"
              type={type}
              label={capitalizeFirst(item)}
              value={
                type === "date" ? convertDate(editItems[item]) : editItems[item]
              }
              error={editItems[item].length < 1}
              disabled={item === "amount"}
              onChange={(e) => {
                if (type === "number" && isNaN(e.target.value)) {
                  return;
                } else {
                  setEditItems({ ...editItems, [item]: e.target.value });
                }
              }}
              // helperText={
              //   editItems[item].length < 1 && "This is a required field."
              // }
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
