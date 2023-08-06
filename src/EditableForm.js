import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditableForm = ({ editItems, setEditItems, handleSubmitChanges }) => {
  let items = Object.keys(editItems).filter((x) => x !== "id");

  return (
    <TableRow key={editItems.id}>
      {items.map((item) => {
        let type = "text";
        if (item === "amount") type = "number";
        if (item === "date") type = "date";
        return (
          <TableCell key={item}>
            <TextField
              size="small"
              id="outlined-required"
              type={type}
              label={item}
              value={editItems[item]}
              error={editItems[item].length < 1}
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
        <Button onClick={handleSubmitChanges}>Submit Changes</Button>
        <Button color="error" onClick={() => setEditItems({})}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableForm;