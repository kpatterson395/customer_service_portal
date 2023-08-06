import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  deletePurchaseHistory,
  editPurchaseHistory,
  addPurchase,
} from "./redux/userData";
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
import Tooltip from "@mui/material/Tooltip";
import DeleteConfirm from "./DeleteConfirm";
import EditableForm from "./EditableForm";
import AddFormRow from "./AddFormRow";

const PurchaseHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [showAdd, setShowAdd] = useState(false);
  const [newAmount, setNewAmount] = useState();
  const [newNote, setNewNote] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [editPurchase, setEditPurchase] = useState({});
  const [deleteId, setDeleteId] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    dispatch(
      deletePurchaseHistory({
        userId: id,
        id: deleteId,
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

  const handleSubmit = () => {
    dispatch(
      addPurchase({
        userId: id,
        newPurchase: {
          date: new Date(newDate).toDateString(),
          amount: newAmount,
          note: newNote,
        },
      })
    );
    setShowAdd(false);
    setNewAmount(0);
    setNewNote("");
    setNewDate("");
  };

  const handleSubmitChanges = () => {
    if (editPurchase.amount && editPurchase.note && editPurchase.date) {
      dispatch(editPurchaseHistory({ userId: id, editPurchase }));
      setEditPurchase({});
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Payment Note</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.purchase_history &&
              user.purchase_history.map((p) => {
                if (p.id === editPurchase.id) {
                  return (
                    <EditableForm
                      key={p.id}
                      editItems={editPurchase}
                      setEditItems={setEditPurchase}
                      handleSubmitChanges={handleSubmitChanges}
                    />
                  );
                }
                return (
                  <TableRow key={p.id}>
                    <TableCell align="right">{p.date}</TableCell>
                    <TableCell align="right">{p.amount}</TableCell>
                    <TableCell align="right">{p.note}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <EditIcon
                          className="clickable"
                          onClick={() => setEditPurchase(p)}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon
                          className="clickable"
                          onClick={() => {
                            setDeleteId(p.id);
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
                formType="Purchase"
                items={{
                  date: { value: newDate, fn: setNewDate },
                  amount: { value: newAmount, fn: setNewAmount },
                  note: { value: newNote, fn: setNewNote },
                }}
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
      <DeleteConfirm
        open={deleteOpen}
        onClose={handleDeleteClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PurchaseHistory;
