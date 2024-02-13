import React, { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

const ProfileInfo = () => {
  const user = useContext(userContext);
  return (
    <Base>
      <div> This is ProfileInfo page.</div>
      <h1>Welcome {user.name}</h1>
    </Base>
  );
};

export default ProfileInfo;
