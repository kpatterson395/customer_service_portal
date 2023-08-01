const UserListItem = ({ user }) => {
  return (
    <div>
      <p>
        {user.last}, {user.first}
      </p>
    </div>
  );
};

export default UserListItem;
