import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddFormRow = ({ formType, items, handleSubmit, setShowAdd, showAdd }) => {
  let keys = Object.keys(items);
  return (
    <TableRow>
      {keys.map((key) => {
        let type = "text";
        if (key === "amount") type = "number";
        if (key === "date") type = "date";

        return (
          <TableCell key={key}>
            <TextField
              size="small"
              id="outlined-required"
              type={type}
              label={key}
              value={items[key].value}
              error={!items[key].value}
              onChange={(e) => items[key].fn(e.target.value)}
              helperText={!items[key].value && "This is a required field."}
            />
          </TableCell>
        );
      })}

      <TableCell>
        <Button onClick={handleSubmit}>Add {formType}</Button>
        <Button color="error" onClick={() => setShowAdd(!showAdd)}>
          Exit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AddFormRow;
