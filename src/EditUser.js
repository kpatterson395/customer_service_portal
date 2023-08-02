import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { editUser, deleteUser } from "./redux/userData";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);
  return <div>{user.first}</div>;
};

export default EditUser;
