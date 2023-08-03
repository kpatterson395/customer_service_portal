import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VehicleSubs = () => {
  const { id } = useParams();

  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  return (
    <div>
      {user.vehicle_subs.map((v) => {
        return (
          <p key={v.licensePlateNo}>
            {v.make} - {v.model} - {v.licensePlateNo}
          </p>
        );
      })}
    </div>
  );
};

export default VehicleSubs;
