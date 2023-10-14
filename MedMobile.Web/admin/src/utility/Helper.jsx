import Avatar from "@components/avatar";

export const renderUserData = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-info",
      "light-danger",
      "light-success",
      "light-warning",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];

  if (row.avatar.length) {
    return <Avatar className="me-50" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        color={color}
        className="me-50"
        content={row.client ? row.client.name : "John Doe"}
      />
    );
  }
};
