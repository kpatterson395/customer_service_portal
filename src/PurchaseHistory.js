import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PurchaseHistory = () => {
  const { id } = useParams();

  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  return (
    <div>
      {user.purchase_history.map((h) => {
        return (
          <p key={h.transactionId}>
            {h.amount} - {h.note}
          </p>
        );
      })}
    </div>
  );
};

export default PurchaseHistory;
