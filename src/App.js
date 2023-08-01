import "./App.css";
import UserList from "./UserList";
import { v4 as uuidv4 } from "uuid";

const users = [
  {
    first: "Kristie",
    last: "Patterson",
    id: uuidv4(),
  },
];

function App() {
  return (
    <div className="App">
      <UserList users={users} />
    </div>
  );
}

export default App;
